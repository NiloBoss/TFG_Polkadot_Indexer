import {
  SubstrateExtrinsic,
  SubstrateEvent,
  SubstrateBlock,
} from "@subql/types";
import { Transfer } from "../types";
import { Block } from "../types";
import { Extrinsics } from "../types";
import { Account } from "../types";
import { Balance, EventRecord } from "@polkadot/types/interfaces";
import { BigNumber } from "ethers";
import { decodeAddress } from "@polkadot/util-crypto";

type ApproveCallArgs = [string, BigNumber] & {
  _spender: string;
  _value: BigNumber;
};

export async function handleEvent(event: SubstrateEvent): Promise<void> {
  logger.info(
    `New transfer event found at block ${event.block.block.header.number.toString()}`
  );

  // Get data from the event
  // The balances.transfer event has the following payload \[from, to, value\]
  // logger.info(JSON.stringify(event));
  const {
    event: {
      data: [from, to, amount],
    },
  } = event;

  const blockNumber = event.block.block.header.number.toBigInt();

  const fromAccount = await checkAndGetAccount(from.toString(), blockNumber);
  const toAccount = await checkAndGetAccount(to.toString(), blockNumber);

  // Create the new transfer entity
  const transfer = Transfer.create({
    id: `${event.block.block.header.number.toNumber()}-${event.idx}`,
    blockNumber,
    fromId: fromAccount.id,
    toId: toAccount.id,
    amount: (amount as Balance).toBigInt(),
  });

  fromAccount.lastTransferBlock = blockNumber;
  toAccount.lastTransferBlock = blockNumber;

  await Promise.all([fromAccount.save(), toAccount.save(), transfer.save()]);
}

async function checkAndGetAccount(
  id: string,
  blockNumber: bigint
): Promise<Account> {
  let account = await Account.get(id.toLowerCase());
  if (!account) {
    // We couldn't find the account
    account = Account.create({
      id: id.toLowerCase(),
      publicKey: decodeAddress(id).toString().toLowerCase(),
      firstTransferBlock: blockNumber,
    });
  }
  return account;
}

export async function handleBlock(block: SubstrateBlock): Promise<void> {
  
  const blockNumber = block.block.header.number.toBigInt();
  const timestamp = block.timestamp;

  logger.info(`New block found at block number: ${blockNumber}`);
  logger.info(`Timestamp: ${timestamp.toString()}`);

  // Create the new transfer entity
  const newBlock = new Block(
    `${block.block.header.number.toNumber()}-${block.specVersion}`
  );
  newBlock.blockNumber = block.block.header.number.toBigInt();
  newBlock.timeStamp = new Date(timestamp.toString());

  // Accesing events from the block:
  for (const event of block.events) {
    await processEvent(event);
  }

  await newBlock.save();
}

async function processEvent(event: EventRecord): Promise<void> {
  // Get info form the event
  const eventName = event.event.method;
  const eventData = event.event.data.toJSON();

  // Specific actions bases in events data and events names
  logger.info(`Event Name: ${eventName}`);
  logger.info(`Event Data: ${JSON.stringify(eventData)}`);
}

export async function handleCall(extrinsic: SubstrateExtrinsic): Promise<void> {
  const blockNumber = extrinsic.block.block.header.number.toBigInt();
  const index = BigInt(extrinsic.idx);
  const success = extrinsic.success;

  // Creation of a extrinsic instance
  const newExtrinsic = new Extrinsics(
    `${blockNumber.toString()}-${index.toString()}`
  );
  newExtrinsic.blockNumber = blockNumber;
  newExtrinsic.index = index;
  newExtrinsic.success = success;

  await newExtrinsic.save();
}

/*export async function collatorJoined(event: SubstrateEvent): Promise<void> {

    const address = event.extrinsic.extrinsic.signer.toString();
    const collator = Collator.create({
      id: address,
      joinedDate: event.block.timestamp,
    });

    await collator.save();
}

// Collator Leaves

export async function collatorLeft(call: SubstrateExtrinsic): Promise<void> {
  const address = call.extrinsic.signer.toString();
  const collator = await Collator.get(address);

  if (!collator) {
    // Collator doesn't exist
  } else {
    collator.leaveDate = call.block.timestamp;
  }

  await collator.save();
}*/



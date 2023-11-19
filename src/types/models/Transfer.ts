// DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression} from "@subql/types-core";
import assert from 'assert';



export type TransferProps = Omit<Transfer, NonNullable<FunctionPropertyNames<Transfer>>| '_name'>;

export class Transfer implements Entity {

    constructor(
        
        id: string,
        fromId: string,
        toId: string,
    ) {
        this.id = id;
        this.fromId = fromId;
        this.toId = toId;
        
    }

    public id: string;
    public amount?: bigint;
    public blockNumber?: bigint;
    public fromId: string;
    public toId: string;
    

    get _name(): string {
        return 'Transfer';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Transfer entity without an ID");
        await store.set('Transfer', id.toString(), this);
    }

    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Transfer entity without an ID");
        await store.remove('Transfer', id.toString());
    }

    static async get(id:string): Promise<Transfer | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Transfer entity without an ID");
        const record = await store.get('Transfer', id.toString());
        if (record) {
            return this.create(record as TransferProps);
        } else {
            return;
        }
    }

    static async getByFromId(fromId: string): Promise<Transfer[] | undefined>{
      const records = await store.getByField('Transfer', 'fromId', fromId);
      return records.map(record => this.create(record as TransferProps));
    }

    static async getByToId(toId: string): Promise<Transfer[] | undefined>{
      const records = await store.getByField('Transfer', 'toId', toId);
      return records.map(record => this.create(record as TransferProps));
    }

    static async getByFields(filter: FieldsExpression<TransferProps>[], options?: { offset?: number, limit?: number}): Promise<Transfer[]> {
        const records = await store.getByFields('Transfer', filter, options);
        return records.map(record => this.create(record as TransferProps));
    }

    static create(record: TransferProps): Transfer {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(
            record.id,
            record.fromId,
            record.toId,
        );
        Object.assign(entity,record);
        return entity;
    }
}

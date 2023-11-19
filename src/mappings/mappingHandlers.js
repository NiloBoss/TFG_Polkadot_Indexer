"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleEvent = exports.handleCall = exports.handleBlock = void 0;
var types_1 = require("../types");
var util_crypto_1 = require("@polkadot/util-crypto");
function handleBlock(block) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
exports.handleBlock = handleBlock;
function handleCall(extrinsic) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
exports.handleCall = handleCall;
function handleEvent(event) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, from, to, amount, blockNumber, fromAccount, toAccount, transfer;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    logger.info("New transfer event found at block ".concat(event.block.block.header.number.toString()));
                    _a = event.event.data, from = _a[0], to = _a[1], amount = _a[2];
                    blockNumber = event.block.block.header.number.toNumber();
                    return [4 /*yield*/, checkAndGetAccount(from.toString(), blockNumber)];
                case 1:
                    fromAccount = _b.sent();
                    return [4 /*yield*/, checkAndGetAccount(to.toString(), blockNumber)];
                case 2:
                    toAccount = _b.sent();
                    transfer = types_1.Transfer.create({
                        id: "".concat(event.block.block.header.number.toNumber(), "-").concat(event.idx),
                        blockNumber: blockNumber,
                        date: event.block.timestamp,
                        fromId: fromAccount.id,
                        toId: toAccount.id,
                        amount: amount.toBigInt(),
                    });
                    fromAccount.lastTransferBlock = blockNumber;
                    toAccount.lastTransferBlock = blockNumber;
                    return [4 /*yield*/, Promise.all([fromAccount.save(), toAccount.save(), transfer.save()])];
                case 3:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.handleEvent = handleEvent;
function checkAndGetAccount(id, blockNumber) {
    return __awaiter(this, void 0, void 0, function () {
        var account;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, types_1.Account.get(id.toLowerCase())];
                case 1:
                    account = _a.sent();
                    if (!account) {
                        // We couldn't find the account
                        account = types_1.Account.create({
                            id: id.toLowerCase(),
                            publicKey: (0, util_crypto_1.decodeAddress)(id).toString().toLowerCase(),
                            firstTransferBlock: blockNumber,
                        });
                    }
                    return [2 /*return*/, account];
            }
        });
    });
}

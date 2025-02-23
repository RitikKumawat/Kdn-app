"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionDao = void 0;
const addTransaction_dao_1 = __importDefault(require("./addTransaction.dao"));
const findById_dao_1 = __importDefault(require("./findById.dao"));
exports.transactionDao = {
    addTransaction: addTransaction_dao_1.default,
    findById: findById_dao_1.default,
};

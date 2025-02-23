"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.models = void 0;
const admin_model_1 = __importDefault(require("./admin.model"));
const customer_model_1 = __importDefault(require("./customer.model"));
const token_model_1 = __importDefault(require("./token.model"));
const transaction_model_1 = __importDefault(require("./transaction.model"));
exports.models = {
    admin: admin_model_1.default,
    token: token_model_1.default,
    customer: customer_model_1.default,
    transaction: transaction_model_1.default,
};

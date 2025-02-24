"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dao = void 0;
const admin_dao_1 = require("./admin-dao");
const customer_dao_1 = require("./customer-dao");
const token_dao_1 = require("./token-dao");
const transaction_dao_1 = require("./transaction-dao");
exports.dao = {
    adminDao: admin_dao_1.adminDao,
    token: token_dao_1.tokenDao,
    customer: customer_dao_1.customer,
    transaction: transaction_dao_1.transactionDao,
};

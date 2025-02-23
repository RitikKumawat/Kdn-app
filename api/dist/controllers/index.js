"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const admin_controller_1 = require("./admin-controller");
const auth_1 = require("./auth");
const index_controller_1 = require("./customers/index.controller");
const transaction_controller_1 = require("./transaction-controller");
exports.controllers = {
    admin: admin_controller_1.adminController,
    auth: auth_1.authController,
    customer: index_controller_1.customerController,
    transaction: transaction_controller_1.transactionController,
};

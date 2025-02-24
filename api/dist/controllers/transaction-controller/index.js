"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionController = void 0;
const addTransaction_controller_1 = require("./addTransaction.controller");
const getAllTransaction_controller_1 = require("./getAllTransaction.controller");
const getAnalytics_controller_1 = require("./getAnalytics.controller");
exports.transactionController = {
    addTransaction: addTransaction_controller_1.addTransaction,
    getTransaction: getAllTransaction_controller_1.getAllTransaction,
    getAnalytics: getAnalytics_controller_1.getAnalytics,
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customer = void 0;
const addCustomer_dao_1 = __importDefault(require("./addCustomer.dao"));
const getAllCustomers_dao_1 = __importDefault(require("./getAllCustomers.dao"));
const getCustomerById_dao_1 = __importDefault(require("./getCustomerById.dao"));
exports.customer = {
    add: addCustomer_dao_1.default,
    getAll: getAllCustomers_dao_1.default,
    getById: getCustomerById_dao_1.default,
};

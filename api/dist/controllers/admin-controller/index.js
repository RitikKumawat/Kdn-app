"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const asyncWrapper_1 = require("../../wrapper/asyncWrapper");
const addCustomer_controller_1 = require("./addCustomer.controller");
const getAllCustomer_controller_1 = require("./getAllCustomer.controller");
const getProfile_controller_1 = require("./getProfile.controller");
const uploadCustomer_controller_1 = require("./uploadCustomer.controller");
exports.adminController = {
    getProfile: (0, asyncWrapper_1.asyncWrapper)(getProfile_controller_1.getAdminData),
    addCustomer: (0, asyncWrapper_1.asyncWrapper)(addCustomer_controller_1.addCustomer),
    getAllCustomers: (0, asyncWrapper_1.asyncWrapper)(getAllCustomer_controller_1.getAllCustomers),
    uploadCustomer: (0, asyncWrapper_1.asyncWrapper)(uploadCustomer_controller_1.uploadCustomer),
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemas = void 0;
const addCustomer_schema_1 = require("./addCustomer.schema");
const adminLogin_schema_1 = require("./adminLogin.schema");
exports.schemas = {
    adminLogin: adminLogin_schema_1.adminLoginSchema,
    customerAddSchema: addCustomer_schema_1.customerAddSchema,
};

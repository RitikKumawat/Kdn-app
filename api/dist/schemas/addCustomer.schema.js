"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerAddSchema = void 0;
const yup_1 = require("yup");
exports.customerAddSchema = (0, yup_1.object)({
    firstName: (0, yup_1.string)().required("First Name is required"),
    lastName: (0, yup_1.string)().required("Last Name is required"),
    contactNumber: (0, yup_1.string)().required("Contact number is required"),
    address: (0, yup_1.string)().required("Address is required"),
});

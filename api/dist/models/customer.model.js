"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    region: {
        type: String,
    },
    boxNumber: {
        type: String,
    },
}, { timestamps: true });
const customerModel = (0, mongoose_1.model)("customer", schema);
exports.default = customerModel;

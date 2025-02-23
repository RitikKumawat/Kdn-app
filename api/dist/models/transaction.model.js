"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    customerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    paymentMode: {
        type: String,
        enum: ["Online", "Cash"],
        required: true,
    },
    amount: {
        type: String,
        required: true,
    },
    pdfPath: {
        type: String,
    },
    lastUpdatedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
}, { timestamps: true });
const transactionModel = (0, mongoose_1.model)("transaction", schema);
exports.default = transactionModel;

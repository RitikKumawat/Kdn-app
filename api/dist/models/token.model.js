"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    token: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose_1.Schema.ObjectId,
        required: true,
    },
}, { timestamps: true });
const tokenModel = (0, mongoose_1.model)("tokens", schema);
exports.default = tokenModel;

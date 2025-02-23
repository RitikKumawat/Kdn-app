"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        enum: ["super-admin", "admin"],
        type: String,
        default: "admin",
    },
}, { timestamps: true });
const adminModel = (0, mongoose_1.model)("admins", schema);
exports.default = adminModel;

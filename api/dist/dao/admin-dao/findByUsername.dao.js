"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByUsername = void 0;
const index_model_1 = require("../../models/index.model");
const findByUsername = (username) => {
    return index_model_1.models.admin.findOne({ username: username }).exec();
};
exports.findByUsername = findByUsername;

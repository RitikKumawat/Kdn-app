"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_model_1 = require("../../models/index.model");
exports.default = (userId) => {
    return index_model_1.models.token.findOneAndDelete({ userId }, { sort: { createdAt: -1 } });
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAdminById = void 0;
const index_model_1 = require("../../models/index.model");
const findAdminById = (id) => {
    return index_model_1.models.admin.findById(id).exec();
};
exports.findAdminById = findAdminById;

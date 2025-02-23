"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminDao = void 0;
const findAdminById_dao_1 = require("./findAdminById.dao");
const findByUsername_dao_1 = require("./findByUsername.dao");
exports.adminDao = {
    findById: findAdminById_dao_1.findAdminById,
    findByUsername: findByUsername_dao_1.findByUsername,
};

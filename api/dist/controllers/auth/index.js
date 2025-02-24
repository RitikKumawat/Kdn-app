"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const asyncWrapper_1 = require("../../wrapper/asyncWrapper");
const adminLogin_controller_1 = require("./adminLogin.controller");
const adminLogout_controller_1 = require("./adminLogout.controller");
exports.authController = {
    adminLogin: (0, asyncWrapper_1.asyncWrapper)(adminLogin_controller_1.adminLogin),
    adminLogout: (0, asyncWrapper_1.asyncWrapper)(adminLogout_controller_1.adminLogout),
};

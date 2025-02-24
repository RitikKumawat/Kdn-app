"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = void 0;
const adminAuth_middleware_1 = require("./auth/adminAuth.middleware");
exports.middleware = {
    adminAuth: adminAuth_middleware_1.adminAuth,
    isSuperAdmin: adminAuth_middleware_1.isSuperAdmin,
};

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSuperAdmin = exports.adminAuth = void 0;
const jsonResponse_1 = require("../../../utils/jsonResponse");
const dao_1 = require("../../../dao");
const adminAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        if (!token || token === "undefined" || token === "null") {
            return (0, jsonResponse_1.JsonResponse)(res, {
                statusCode: 401,
                status: "error",
                title: "Token not found",
                message: "Token not found",
            });
        }
        const verifiedData = yield dao_1.dao.token.validate(token);
        if (!verifiedData) {
            return (0, jsonResponse_1.JsonResponse)(res, {
                statusCode: 401,
                status: "error",
                title: "Token Expired",
                message: "Token Expired",
            });
        }
        const adminData = yield dao_1.dao.adminDao.findById(verifiedData.userId.toString());
        if (!adminData) {
            return (0, jsonResponse_1.JsonResponse)(res, {
                statusCode: 400,
                status: "error",
                title: "Admin not found",
                message: "Not found",
            });
        }
        res.locals.role = adminData.role;
        res.locals.username = adminData.username;
        res.locals.userId = verifiedData.userId.toString();
        next();
    }
    catch (error) {
        return (0, jsonResponse_1.JsonResponse)(res, {
            statusCode: 401,
            status: "error",
            title: "Invalid Access",
            message: "Invalid Access",
        });
    }
});
exports.adminAuth = adminAuth;
const isSuperAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (res.locals.role === "super-admin") {
            return next();
        }
        return (0, jsonResponse_1.JsonResponse)(res, {
            statusCode: 401,
            status: "error",
            title: "Invalid Access",
            message: "This route is accessible only for super admin",
        });
    }
    catch (error) {
        return (0, jsonResponse_1.JsonResponse)(res, {
            statusCode: 401,
            status: "error",
            title: "Invalid Access",
            message: "Invalid Access",
        });
    }
});
exports.isSuperAdmin = isSuperAdmin;

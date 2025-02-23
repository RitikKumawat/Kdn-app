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
exports.adminLogin = void 0;
const jsonResponse_1 = require("../../utils/jsonResponse");
const index_constants_1 = require("../../constants/index.constants");
const dao_1 = require("../../dao");
const password_utils_1 = require("../../utils/password.utils");
const oneMonth = 30 * 24 * 60 * 60 * 1000;
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, fcmToken } = req.body;
    const admin = yield dao_1.dao.adminDao.findByUsername(username);
    // console.log("Passwrod", password);
    if (!admin) {
        return (0, jsonResponse_1.JsonResponse)(res, {
            statusCode: 400,
            status: "error",
            title: "Admin Not Found",
            message: "Admin not found with this username",
        });
    }
    if (!(0, password_utils_1.comparePassword)(password, admin.password)) {
        return (0, jsonResponse_1.JsonResponse)(res, {
            statusCode: 400,
            status: "error",
            title: "Incorrect Password",
            message: "Please enter correct password.",
        });
    }
    const tokenData = yield dao_1.dao.token.create({
        id: `${admin._id.toString()}`,
        username: admin.username,
        role: admin.role,
    });
    if (!tokenData) {
        return (0, jsonResponse_1.JsonResponse)(res, {
            statusCode: 400,
            status: "error",
            title: "Warning",
            message: "Something went wrong. Please try again.",
        });
    }
    const expiryDate = new Date(Date.now() + oneMonth);
    res.cookie(index_constants_1.CONSTANTS.adminAuth, tokenData.token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        expires: expiryDate, // Expire in one month
    });
    //   if (fcmToken) {
    //     const topic =
    //       admin.role === ADMIN_ROLES.CENTRE_MANAGER
    //         ? `${admin.role}-${admin.centre}-${process.env.NODE_ENV}`
    //         : `${admin.role}-${process.env.NODE_ENV}`;
    //     notificationService.subscribeToTopicAdmin({
    //       fcmToken: fcmToken as string,
    //       topic: topic,
    //     });
    //   }
    return (0, jsonResponse_1.JsonResponse)(res, {
        status: "success",
        statusCode: 200,
        title: "Login Approved",
        message: "Login successfully.",
        data: Object.assign(Object.assign({}, admin.toObject()), { password: undefined, token: tokenData.token }),
    });
});
exports.adminLogin = adminLogin;

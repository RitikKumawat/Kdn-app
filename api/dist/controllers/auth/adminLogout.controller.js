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
exports.adminLogout = void 0;
const index_constants_1 = require("../../constants/index.constants");
const jsonResponse_1 = require("../../utils/jsonResponse");
// import { notificationService } from "../../services/notification.service";
const adminLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fcmToken } = req.body;
    console.log("Cookie", res.cookie);
    res.clearCookie(index_constants_1.CONSTANTS.adminAuth);
    return (0, jsonResponse_1.JsonResponse)(res, {
        status: "success",
        statusCode: 200,
        title: "Logout Successfully.",
        message: "Logout successfully.",
    });
});
exports.adminLogout = adminLogout;

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
exports.getAdminData = void 0;
const jsonResponse_1 = require("../../utils/jsonResponse");
const getAdminData = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, jsonResponse_1.JsonResponse)(res, {
        statusCode: 200,
        status: "success",
        title: "Data Found",
        message: "Data found successfully",
        data: {
            _id: res.locals.userId,
            username: res.locals.username,
            role: res.locals.role,
        },
    });
});
exports.getAdminData = getAdminData;

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
exports.addCustomer = void 0;
const jsonResponse_1 = require("../../utils/jsonResponse");
const dao_1 = require("../../dao");
const addCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.userId;
    const { firstName, lastName, contactNumber, address } = req.body;
    if (!userId) {
        return (0, jsonResponse_1.JsonResponse)(res, {
            message: "Could not find userid",
            status: "error",
            statusCode: 401,
            title: "error",
        });
    }
    const admin = yield dao_1.dao.adminDao.findById(userId);
    if (!admin) {
        return (0, jsonResponse_1.JsonResponse)(res, {
            message: "Could not find admin",
            status: "error",
            statusCode: 401,
            title: "Unauthorized User",
        });
    }
    const data = {
        firstName: firstName,
        lastName: lastName,
        contactNumber: contactNumber,
        address: address,
    };
    const customerDetail = yield dao_1.dao.customer.add(data);
    if (!customerDetail) {
        return (0, jsonResponse_1.JsonResponse)(res, {
            message: "Error adding customer details",
            status: "error",
            statusCode: 400,
            title: "Error adding details",
        });
    }
    return (0, jsonResponse_1.JsonResponse)(res, {
        message: "Successfully added customer details",
        status: "success",
        statusCode: 200,
        title: "Successfully added details",
    });
});
exports.addCustomer = addCustomer;

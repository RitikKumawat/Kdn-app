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
exports.getCustomerById = void 0;
const jsonResponse_1 = require("../../utils/jsonResponse");
const dao_1 = require("../../dao");
const getCustomerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customerId } = req.body;
    if (!customerId) {
        return (0, jsonResponse_1.JsonResponse)(res, {
            message: "Customer Id not found",
            status: "error",
            statusCode: 400,
            title: "Customer Id not found",
        });
    }
    const customer = yield dao_1.dao.customer.getById(customerId);
    if (!customer) {
        return (0, jsonResponse_1.JsonResponse)(res, {
            message: "Cannot find customer",
            status: "error",
            statusCode: 400,
            title: "Customer not found",
        });
    }
    return (0, jsonResponse_1.JsonResponse)(res, {
        message: "Customer Details fetched",
        status: "success",
        statusCode: 200,
        title: "Successfully fetched",
        data: customer,
    });
});
exports.getCustomerById = getCustomerById;

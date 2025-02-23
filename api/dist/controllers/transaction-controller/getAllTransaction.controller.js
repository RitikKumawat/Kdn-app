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
exports.getAllTransaction = void 0;
const jsonResponse_1 = require("../../utils/jsonResponse");
const dao_1 = require("../../dao");
const getAllTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customerId } = req.body;
    if (!customerId) {
        return (0, jsonResponse_1.JsonResponse)(res, {
            message: "All fields required",
            status: "error",
            statusCode: 400,
            title: "Customer Id missing",
        });
    }
    const transaction = yield dao_1.dao.transaction.findById(customerId);
    if (!transaction) {
        return (0, jsonResponse_1.JsonResponse)(res, {
            message: "No transaction found",
            status: "error",
            statusCode: 400,
            title: "NO transaction found",
        });
    }
    return (0, jsonResponse_1.JsonResponse)(res, {
        message: "Transactions fetched",
        status: "success",
        statusCode: 200,
        title: "Transaction fetched successfully",
        data: transaction,
    });
});
exports.getAllTransaction = getAllTransaction;

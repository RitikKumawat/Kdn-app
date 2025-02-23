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
exports.getAllCustomers = void 0;
const dao_1 = require("../../dao");
const jsonResponse_1 = require("../../utils/jsonResponse");
const getAllCustomers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search } = req.query;
    const data = yield dao_1.dao.customer.getAll({ search: search });
    if (!data) {
        return (0, jsonResponse_1.JsonResponse)(res, {
            message: "Could not fetch data",
            status: "error",
            statusCode: 400,
            title: "Error fetching data",
        });
    }
    return (0, jsonResponse_1.JsonResponse)(res, {
        message: "Successfully fetched customer's data",
        status: "success",
        statusCode: 200,
        title: "Successfully fetched",
        data: data,
    });
});
exports.getAllCustomers = getAllCustomers;

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
exports.addTransaction = void 0;
const jsonResponse_1 = require("../../utils/jsonResponse");
const dao_1 = require("../../dao");
const convertHtmlToPdf_1 = require("../../services/convertHtmlToPdf");
const invoice_template_1 = require("../../templates/invoice_template");
const generateFileUrl_1 = require("../../utils/generateFileUrl");
const uuid_1 = require("uuid");
const generateUniqueFileName = () => {
    return (0, uuid_1.v4)();
};
const addTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customerId, paymentMode, amount } = req.body;
    if (!customerId || !paymentMode || !amount) {
        return (0, jsonResponse_1.JsonResponse)(res, {
            message: "All fields are required",
            status: "error",
            statusCode: 400,
            title: "Provide all fields",
        });
    }
    const customer = yield dao_1.dao.customer.getById(customerId);
    if (!customer) {
        return (0, jsonResponse_1.JsonResponse)(res, {
            message: "Customer not found",
            status: "error",
            statusCode: 400,
            title: "Customer not found",
        });
    }
    const transactionData = {
        customerId: customer._id,
        paymentMode: paymentMode,
        amount: amount,
        lastUpdatedBy: res.locals.userId,
    };
    const uniqueFileName = `${customer._id}_${generateUniqueFileName()}`;
    yield (0, convertHtmlToPdf_1.convertInvoiceHtmlToPdf)((0, invoice_template_1.invoiceTemplate)({
        name: `${customer.firstName} ${customer.lastName}`,
        amount: amount,
        paymentMode: paymentMode,
    }), uniqueFileName).then((generatePdfPath) => {
        let fileUrl;
        if (generatePdfPath) {
            fileUrl = (0, generateFileUrl_1.generateFileUrl)(req, generatePdfPath);
            transactionData["pdfPath"] = fileUrl;
        }
    });
    const transaction = yield dao_1.dao.transaction.addTransaction(transactionData);
    if (!transaction) {
        return (0, jsonResponse_1.JsonResponse)(res, {
            message: "Could not add transaction",
            status: "error",
            statusCode: 400,
            title: "Failed to add transaction",
        });
    }
    return (0, jsonResponse_1.JsonResponse)(res, {
        message: "Successfully added transaction",
        status: "success",
        statusCode: 200,
        title: "Successfully added transaction",
        data: transaction,
    });
});
exports.addTransaction = addTransaction;

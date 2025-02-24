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
exports.asyncWrapper = void 0;
const mongodb_1 = require("mongodb");
const jsonResponse_1 = require("../utils/jsonResponse");
const formatMongooseError_utils_1 = require("../utils/formatMongooseError.utils");
const asyncWrapper = (fn) => {
    return (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield fn(req, res);
        }
        catch (error) {
            let isDuplicate = null;
            console.log("Async Wrapper: ", error);
            if (error instanceof mongodb_1.MongoServerError &&
                error.errorResponse &&
                error.errorResponse.code === 11000)
                isDuplicate = (0, formatMongooseError_utils_1.formatDuplicateError)(error);
            return (0, jsonResponse_1.JsonResponse)(res, {
                statusCode: isDuplicate ? 400 : 500,
                status: "error",
                message: isDuplicate !== null && isDuplicate !== void 0 ? isDuplicate : error.message,
                title: "Something went wrong",
            });
        }
    });
};
exports.asyncWrapper = asyncWrapper;

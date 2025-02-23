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
exports.validateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const index_model_1 = require("../../models/index.model");
const env_1 = require("../../env/env");
const validateToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const decode = (0, jsonwebtoken_1.verify)(token, (_a = env_1.ENV.JWT_TOKEN) !== null && _a !== void 0 ? _a : "");
    const tokenData = yield index_model_1.models.token.findOne({ token });
    if (!tokenData || tokenData.userId.toString() !== decode.id.toString()) {
        return undefined;
    }
    return tokenData;
});
exports.validateToken = validateToken;

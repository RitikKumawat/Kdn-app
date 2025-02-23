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
exports.createToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const env_1 = require("../../env/env");
const index_model_1 = require("../../models/index.model");
const createToken = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, username, role, expiresIn = 24 * 60 * 60 } = data;
    if (!env_1.ENV.JWT_TOKEN) {
        throw new Error("Please setup jwt token in env.");
    }
    const token = (0, jsonwebtoken_1.sign)({ id, username, role }, env_1.ENV.JWT_TOKEN, {
        expiresIn: expiresIn,
    });
    return yield index_model_1.models.token.create({ token, userId: id });
});
exports.createToken = createToken;

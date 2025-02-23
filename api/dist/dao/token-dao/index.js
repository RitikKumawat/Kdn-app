"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenDao = void 0;
const create_token_dao_1 = require("./create-token.dao");
const delete_token_dao_1 = __importDefault(require("./delete-token.dao"));
const validateToken_dao_1 = require("./validateToken.dao");
exports.tokenDao = {
    validate: validateToken_dao_1.validateToken,
    create: create_token_dao_1.createToken,
    delete: delete_token_dao_1.default,
};

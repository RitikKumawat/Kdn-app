"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.ENV = {
    MONGO_DB_URL: process.env.MONGO_DB_URL,
    JWT_TOKEN: process.env.JWT_TOKEN,
};

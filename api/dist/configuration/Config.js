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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("../env/env");
class Config {
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                // Connect to mondoDb
                yield this.dbConnect((_a = env_1.ENV.MONGO_DB_URL) !== null && _a !== void 0 ? _a : "");
                console.log("mongodb", env_1.ENV.MONGO_DB_URL);
            }
            catch (error) {
                console.error("OOPS! ", error);
                throw new Error("error");
            }
        });
    }
    dbConnect(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose_1.default.connect(url, {
                    serverSelectionTimeoutMS: 30000,
                });
                console.log("Connected to DB");
            }
            catch (error) {
                console.error("DB Connection Error ", error);
            }
        });
    }
}
exports.Config = Config;

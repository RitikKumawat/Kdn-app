"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonRoutesConfig = void 0;
const express_1 = __importDefault(require("express"));
class CommonRoutesConfig {
    constructor(app, name) {
        this.app = app;
        this.name = name;
        this.router = express_1.default.Router();
        this.configureRoutes(this.router);
    }
    getName() {
        return this.name;
    }
}
exports.CommonRoutesConfig = CommonRoutesConfig;

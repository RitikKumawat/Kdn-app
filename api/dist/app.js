"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const admin_routes_1 = require("./routes/admin/admin.routes");
const index_routes_1 = require("./routes/index/index.routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 4000;
const routes = [];
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.set("rootDirectory", __dirname);
app.use("/uploads", express_1.default.static("uploads"));
routes.push(new admin_routes_1.AdminRoutes(app));
routes.push(new index_routes_1.IndexRoutes(app));
app.get("/", (req, res) => {
    res.send("Welcome to Express & TypeScript Server on Vercel!");
});
// **Export the handler for Vercel**
exports.default = (req, res) => {
    return app(req, res);
};

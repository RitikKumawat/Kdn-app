"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = require("http");
const cors_1 = __importDefault(require("cors"));
const Config_1 = require("./configuration/Config");
const admin_routes_1 = require("./routes/admin/admin.routes");
const index_routes_1 = require("./routes/index/index.routes");
const socket_io_1 = require("socket.io");
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 4000;
const routes = [];
const server = (0, http_1.createServer)(app);
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
    },
});
app.enable("trust proxy");
// **CORS middleware** - Apply before defining routes
app.use((0, cors_1.default)());
// Middleware to parse JSON requests
app.use(express_1.default.json());
app.set("rootDirectory", __dirname);
app.use("/uploads", express_1.default.static("uploads"));
// app.use("/uploads", express.static("uploads"));
// app.use("/images", express.static("images"));
routes.push(new admin_routes_1.AdminRoutes(app));
routes.push(new index_routes_1.IndexRoutes(app));
app.get("/", (req, res) => {
    res.send("Welcome to Express & TypeScript Server");
});
const runningMessage = `Server running at http://localhost:${port}`;
new Config_1.Config()
    .start()
    .then(() => {
    server.listen(port, () => {
        console.log(runningMessage);
        routes.forEach((route) => {
            console.log(`Routes configured for ${route.getName()}`);
        });
    });
})
    .catch((error) => {
    console.log("Config Error ", error);
});

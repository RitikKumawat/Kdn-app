"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const jsonResponse_1 = require("../../utils/jsonResponse");
const common_routes_1 = require("../common/common.routes");
const index_middleware_1 = require("../middleware/index.middleware");
const controllers_1 = require("../../controllers");
const customer_query_1 = __importDefault(require("./query/customer.query"));
const transaction_query_1 = __importDefault(require("./query/transaction.query"));
class AdminRoutes extends common_routes_1.CommonRoutesConfig {
    constructor(app) {
        super(app, "Admin Routes");
        this.app.use("/admin", index_middleware_1.middleware.adminAuth, this.router);
    }
    configureRoutes(router) {
        router.get("/", (req, res) => {
            return (0, jsonResponse_1.JsonResponse)(res, {
                statusCode: 200,
                title: "admin api called",
                status: "success",
                message: "api called successfully",
            });
        });
        router.get("/get-profile", controllers_1.controllers.admin.getProfile);
        router.post("/logout", controllers_1.controllers.auth.adminLogout);
        (0, customer_query_1.default)(router);
        (0, transaction_query_1.default)(router);
        return this.app;
    }
}
exports.AdminRoutes = AdminRoutes;

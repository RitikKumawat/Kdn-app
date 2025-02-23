"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexRoutes = void 0;
const jsonResponse_1 = require("../../utils/jsonResponse");
const common_routes_1 = require("../common/common.routes");
const auth_query_1 = require("./queries/auth.query");
class IndexRoutes extends common_routes_1.CommonRoutesConfig {
    constructor(app) {
        super(app, "Index Routes");
        this.app.use("/", this.router);
    }
    configureRoutes(router) {
        router.get("/", (req, res) => {
            return (0, jsonResponse_1.JsonResponse)(res, {
                statusCode: 200,
                title: "Index api called",
                status: "success",
                message: "api called successfully",
            });
        });
        (0, auth_query_1.authQuery)(router);
        return this.app;
    }
}
exports.IndexRoutes = IndexRoutes;

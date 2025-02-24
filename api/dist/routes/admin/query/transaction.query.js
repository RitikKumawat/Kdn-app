"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../../../controllers");
const index_middleware_1 = require("../../middleware/index.middleware");
exports.default = (router) => {
    router.post("/add-transaction", controllers_1.controllers.transaction.addTransaction);
    router.post("/get-transaction", controllers_1.controllers.transaction.getTransaction);
    router.get("/get-analytic-transaction", index_middleware_1.middleware.isSuperAdmin, controllers_1.controllers.transaction.getAnalytics);
};

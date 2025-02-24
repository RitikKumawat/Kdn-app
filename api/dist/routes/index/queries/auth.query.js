"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authQuery = void 0;
const controllers_1 = require("../../../controllers");
const validateBody_utils_1 = require("../../../utils/validateBody.utils");
const index_schema_1 = require("../../../schemas/index.schema");
const authQuery = (router) => {
    router.post("/auth/admin-login", (0, validateBody_utils_1.validateBody)(index_schema_1.schemas.adminLogin), controllers_1.controllers.auth.adminLogin);
};
exports.authQuery = authQuery;

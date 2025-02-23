"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateBody_utils_1 = require("../../../utils/validateBody.utils");
const index_schema_1 = require("../../../schemas/index.schema");
const controllers_1 = require("../../../controllers");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: "./uploads",
    filename: (_req, file, cb) => {
        const fileName = file.originalname;
        cb(null, fileName);
    },
});
const uploadFile = (0, multer_1.default)({ storage: storage });
exports.default = (router) => {
    router.post("/add-customer", (0, validateBody_utils_1.validateBody)(index_schema_1.schemas.customerAddSchema), controllers_1.controllers.admin.addCustomer);
    router.get("/get-all-customers", controllers_1.controllers.admin.getAllCustomers);
    router.post("/upload-customers", uploadFile.single("uploadFile"), controllers_1.controllers.admin.uploadCustomer);
    router.post("/get-customer-details", controllers_1.controllers.customer.getById);
};

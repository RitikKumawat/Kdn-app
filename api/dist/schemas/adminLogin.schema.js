"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLoginSchema = void 0;
const yup_1 = require("yup");
exports.adminLoginSchema = (0, yup_1.object)({
    username: (0, yup_1.string)().required("Username is required"),
    password: (0, yup_1.string)()
        .required("password is required")
        .min(8, "Password must be at least 8 characters long")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
});

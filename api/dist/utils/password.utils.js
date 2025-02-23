"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.encodePassword = void 0;
const bcrypt_1 = require("bcrypt");
const encodePassword = (e) => {
    return (0, bcrypt_1.hashSync)(e, 10);
};
exports.encodePassword = encodePassword;
const comparePassword = (e, encrypted) => {
    const hashed = (0, bcrypt_1.hashSync)(e, 10);
    return (0, bcrypt_1.compareSync)(e, encrypted);
};
exports.comparePassword = comparePassword;

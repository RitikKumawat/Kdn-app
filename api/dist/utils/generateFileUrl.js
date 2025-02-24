"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFileUrl = void 0;
const generateFileUrl = (req, filePath) => {
    const isSecure = process.env.NODE_ENV == "development";
    const requestProtocol = isSecure ? "https" : "http";
    const serverUrl = requestProtocol + "://" + req.get("host");
    const fileUrl = serverUrl + "/" + filePath;
    return fileUrl;
};
exports.generateFileUrl = generateFileUrl;

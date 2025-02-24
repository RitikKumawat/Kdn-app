"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonResponse = void 0;
const JsonResponse = (res, body) => {
    res.status(body.statusCode);
    res.send({
        status: body.status,
        title: body.title,
        message: body.message,
        data: body.data,
        pageData: body.pageData,
        extraData: body.extraData,
    });
};
exports.JsonResponse = JsonResponse;

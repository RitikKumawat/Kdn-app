import { Response } from "express";
import { IServerResponse } from "../types/response-types";

export const JsonResponse = (res: Response, body: IServerResponse) => {
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

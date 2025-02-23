import { Request, Response } from "express";
import { JsonResponse } from "../../utils/jsonResponse";
import { dao } from "../../dao";

export const getAdminData = async (_req: Request, res: Response) => {
  return JsonResponse(res, {
    statusCode: 200,
    status: "success",
    title: "Data Found",
    message: "Data found successfully",
    data: {
      _id: res.locals.userId,
      username: res.locals.username,
      role: res.locals.role,
    },
  });
};

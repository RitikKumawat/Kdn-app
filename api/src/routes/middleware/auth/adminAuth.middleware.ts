import { NextFunction, Request, Response } from "express";
import { JsonResponse } from "../../../utils/jsonResponse";
import { CONSTANTS } from "../../../constants/index.constants";
import { dao } from "../../../dao";

export const adminAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token || token === "undefined" || token === "null") {
      return JsonResponse(res, {
        statusCode: 401,
        status: "error",
        title: "Token not found",
        message: "Token not found",
      });
    }

    const verifiedData = await dao.token.validate(token);

    if (!verifiedData) {
      return JsonResponse(res, {
        statusCode: 401,
        status: "error",
        title: "Token Expired",
        message: "Token Expired",
      });
    }
    const adminData = await dao.adminDao.findById(
      verifiedData.userId.toString()
    );
    if (!adminData) {
      return JsonResponse(res, {
        statusCode: 400,
        status: "error",
        title: "Admin not found",
        message: "Not found",
      });
    }
    res.locals.role = adminData.role;
    res.locals.username = adminData.username;
    res.locals.userId = verifiedData.userId.toString();
    next();
  } catch (error) {
    return JsonResponse(res, {
      statusCode: 401,
      status: "error",
      title: "Invalid Access",
      message: "Invalid Access",
    });
  }
};

export const isSuperAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (res.locals.role === "super-admin") {
      return next();
    }
    return JsonResponse(res, {
      statusCode: 401,
      status: "error",
      title: "Invalid Access",
      message: "This route is accessible only for super admin",
    });
  } catch (error) {
    return JsonResponse(res, {
      statusCode: 401,
      status: "error",
      title: "Invalid Access",
      message: "Invalid Access",
    });
  }
};

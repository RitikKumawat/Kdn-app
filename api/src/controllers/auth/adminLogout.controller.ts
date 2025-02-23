import { Request, Response } from "express";
import { CONSTANTS } from "../../constants/index.constants";
import { JsonResponse } from "../../utils/jsonResponse";
// import { notificationService } from "../../services/notification.service";

export const adminLogout = async (req: Request, res: Response) => {
  const { fcmToken } = req.body;
  console.log("Cookie", res.cookie);

  res.clearCookie(CONSTANTS.adminAuth);
  return JsonResponse(res, {
    status: "success",
    statusCode: 200,
    title: "Logout Successfully.",
    message: "Logout successfully.",
  });
};

import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { JsonResponse } from "../../utils/jsonResponse";
import { CONSTANTS } from "../../constants/index.constants";
import { dao } from "../../dao";
import { comparePassword } from "../../utils/password.utils";

const oneMonth = 30 * 24 * 60 * 60 * 1000;

export const adminLogin = async (req: Request, res: Response) => {
  const { username, password, fcmToken } = req.body;

  const admin = await dao.adminDao.findByUsername(username);
  // console.log("Passwrod", password);

  if (!admin) {
    return JsonResponse(res, {
      statusCode: 400,
      status: "error",
      title: "Admin Not Found",
      message: "Admin not found with this username",
    });
  }
  if (!comparePassword(password, admin.password)) {
    return JsonResponse(res, {
      statusCode: 400,
      status: "error",
      title: "Incorrect Password",
      message: "Please enter correct password.",
    });
  }

  const tokenData = await dao.token.create({
    id: `${(admin._id as ObjectId).toString()}`,
    username: admin.username,
    role: admin.role,
  });

  if (!tokenData) {
    return JsonResponse(res, {
      statusCode: 400,
      status: "error",
      title: "Warning",
      message: "Something went wrong. Please try again.",
    });
  }

  const expiryDate = new Date(Date.now() + oneMonth);

  res.cookie(CONSTANTS.adminAuth, tokenData.token, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    expires: expiryDate, // Expire in one month
  });
  //   if (fcmToken) {
  //     const topic =
  //       admin.role === ADMIN_ROLES.CENTRE_MANAGER
  //         ? `${admin.role}-${admin.centre}-${process.env.NODE_ENV}`
  //         : `${admin.role}-${process.env.NODE_ENV}`;
  //     notificationService.subscribeToTopicAdmin({
  //       fcmToken: fcmToken as string,
  //       topic: topic,
  //     });
  //   }
  return JsonResponse(res, {
    status: "success",
    statusCode: 200,
    title: "Login Approved",
    message: "Login successfully.",
    data: {
      ...admin.toObject(),
      password: undefined,
      token: tokenData.token,
    },
  });
};

import { Request, Response } from "express";
import { JsonResponse } from "../../utils/jsonResponse";
import { dao } from "../../dao";
import { ICustomerModel } from "../../interfaces/models/customer.interface";

export const addCustomer = async (req: Request, res: Response) => {
  const userId = res.locals.userId;
  const { firstName, lastName, contactNumber, address } = req.body;

  if (!userId) {
    return JsonResponse(res, {
      message: "Could not find userid",
      status: "error",
      statusCode: 401,
      title: "error",
    });
  }
  const admin = await dao.adminDao.findById(userId);
  if (!admin) {
    return JsonResponse(res, {
      message: "Could not find admin",
      status: "error",
      statusCode: 401,
      title: "Unauthorized User",
    });
  }
  const data: Partial<ICustomerModel> = {
    firstName: firstName,
    lastName: lastName,
    contactNumber: contactNumber,
    address: address,
  };
  const customerDetail = await dao.customer.add(data);
  if (!customerDetail) {
    return JsonResponse(res, {
      message: "Error adding customer details",
      status: "error",
      statusCode: 400,
      title: "Error adding details",
    });
  }
  return JsonResponse(res, {
    message: "Successfully added customer details",
    status: "success",
    statusCode: 200,
    title: "Successfully added details",
  });
};

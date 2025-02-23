import { Request, Response } from "express";
import { JsonResponse } from "../../utils/jsonResponse";
import { dao } from "../../dao";

export const getCustomerById = async (req: Request, res: Response) => {
  const { customerId } = req.body;
  if (!customerId) {
    return JsonResponse(res, {
      message: "Customer Id not found",
      status: "error",
      statusCode: 400,
      title: "Customer Id not found",
    });
  }
  const customer = await dao.customer.getById(customerId);
  if (!customer) {
    return JsonResponse(res, {
      message: "Cannot find customer",
      status: "error",
      statusCode: 400,
      title: "Customer not found",
    });
  }
  return JsonResponse(res, {
    message: "Customer Details fetched",
    status: "success",
    statusCode: 200,
    title: "Successfully fetched",
    data: customer,
  });
};

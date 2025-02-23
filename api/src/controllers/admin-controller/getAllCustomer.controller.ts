import { Request, Response } from "express";
import { dao } from "../../dao";
import { JsonResponse } from "../../utils/jsonResponse";

export const getAllCustomers = async (req: Request, res: Response) => {
  const { search } = req.query;
  const data = await dao.customer.getAll({ search: search as string });
  if (!data) {
    return JsonResponse(res, {
      message: "Could not fetch data",
      status: "error",
      statusCode: 400,
      title: "Error fetching data",
    });
  }
  return JsonResponse(res, {
    message: "Successfully fetched customer's data",
    status: "success",
    statusCode: 200,
    title: "Successfully fetched",
    data: data,
  });
};

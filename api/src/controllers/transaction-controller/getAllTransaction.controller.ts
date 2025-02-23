import { Request, Response } from "express";
import { JsonResponse } from "../../utils/jsonResponse";
import { dao } from "../../dao";
export const getAllTransaction = async (req: Request, res: Response) => {
  const { customerId } = req.body;
  if (!customerId) {
    return JsonResponse(res, {
      message: "All fields required",
      status: "error",
      statusCode: 400,
      title: "Customer Id missing",
    });
  }
  const transaction = await dao.transaction.findById(customerId);
  if (!transaction) {
    return JsonResponse(res, {
      message: "No transaction found",
      status: "error",
      statusCode: 400,
      title: "NO transaction found",
    });
  }
  return JsonResponse(res, {
    message: "Transactions fetched",
    status: "success",
    statusCode: 200,
    title: "Transaction fetched successfully",
    data: transaction,
  });
};

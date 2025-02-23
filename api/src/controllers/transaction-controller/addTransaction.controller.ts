import { Request, Response } from "express";
import { JsonResponse } from "../../utils/jsonResponse";
import { dao } from "../../dao";
import { convertInvoiceHtmlToPdf } from "../../services/convertHtmlToPdf";
import { invoiceTemplate } from "../../templates/invoice_template";
import { generateFileUrl } from "../../utils/generateFileUrl";
import { ITransactionModel } from "../../interfaces/models/transaction.interface";
import { v4 as uuidv4 } from "uuid";

const generateUniqueFileName = (): string => {
  return uuidv4();
};
export const addTransaction = async (req: Request, res: Response) => {
  const { customerId, paymentMode, amount } = req.body;
  if (!customerId || !paymentMode || !amount) {
    return JsonResponse(res, {
      message: "All fields are required",
      status: "error",
      statusCode: 400,
      title: "Provide all fields",
    });
  }

  const customer = await dao.customer.getById(customerId);
  if (!customer) {
    return JsonResponse(res, {
      message: "Customer not found",
      status: "error",
      statusCode: 400,
      title: "Customer not found",
    });
  }
  const transactionData: Partial<ITransactionModel> = {
    customerId: customer._id,
    paymentMode: paymentMode,
    amount: amount,
    lastUpdatedBy: res.locals.userId,
  };
  const uniqueFileName = `${customer._id}_${generateUniqueFileName()}`;
  await convertInvoiceHtmlToPdf(
    invoiceTemplate({
      name: `${customer.firstName} ${customer.lastName}`,
      amount: amount,
      paymentMode: paymentMode,
    }),
    uniqueFileName
  ).then((generatePdfPath) => {
    let fileUrl;
    if (generatePdfPath) {
      fileUrl = generateFileUrl(req, generatePdfPath);
      transactionData["pdfPath"] = fileUrl;
    }
  });
  const transaction = await dao.transaction.addTransaction(transactionData);
  if (!transaction) {
    return JsonResponse(res, {
      message: "Could not add transaction",
      status: "error",
      statusCode: 400,
      title: "Failed to add transaction",
    });
  }
  return JsonResponse(res, {
    message: "Successfully added transaction",
    status: "success",
    statusCode: 200,
    title: "Successfully added transaction",
    data: transaction,
  });
};

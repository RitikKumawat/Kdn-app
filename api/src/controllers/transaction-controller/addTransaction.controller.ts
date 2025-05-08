import { Request, Response } from "express";
import { JsonResponse } from "../../utils/jsonResponse";
import { dao } from "../../dao";
import { convertInvoiceHtmlToPdf } from "../../services/convertHtmlToPdf";
import { invoiceTemplate } from "../../templates/invoice_template";
import { generateFileUrl } from "../../utils/generateFileUrl";
import { ITransactionModel } from "../../interfaces/models/transaction.interface";
import { v4 as uuidv4 } from "uuid";

const generateUniqueFileName = (): string => uuidv4();

export const addTransaction = async (req: Request, res: Response) => {
  try {
    const { customerId, paymentMode, amount } = req.body;

    // Validate input
    if (!customerId || !paymentMode || !amount) {
      return JsonResponse(res, {
        message: "All fields are required",
        status: "error",
        statusCode: 400,
        title: "Provide all fields",
      });
    }

    // Fetch customer details
    const customer = await dao.customer.getById(customerId);
    if (!customer) {
      return JsonResponse(res, {
        message: "Customer not found",
        status: "error",
        statusCode: 400,
        title: "Customer not found",
      });
    }

    // Prepare transaction data
    const transactionData: Partial<ITransactionModel> = {
      customerId: customer._id,
      paymentMode,
      amount,
      lastUpdatedBy: res.locals.userId,
    };

    // Generate unique filename
    // const uniqueFileName = `${customer._id}_${generateUniqueFileName()}`;

    // // Generate invoice PDF
    // const generatePdfPath = await convertInvoiceHtmlToPdf(
    //   invoiceTemplate({
    //     name: `${customer.firstName} ${customer.lastName}`,
    //     amount,
    //     paymentMode,
    //   }),
    //   uniqueFileName
    // );

    // // Add PDF path if successful
    // if (generatePdfPath) {
    //   transactionData.pdfPath = generateFileUrl(req, generatePdfPath);
    // }

    // Save transaction in database
    const transaction = await dao.transaction.addTransaction(transactionData);
    if (!transaction) {
      return JsonResponse(res, {
        message: "Could not add transaction",
        status: "error",
        statusCode: 500,
        title: "Transaction failed",
      });
    }

    // Success response
    return JsonResponse(res, {
      message: "Transaction added successfully",
      status: "success",
      statusCode: 201,
      title: "Success",
      data: transaction,
    });
  } catch (error) {
    console.error("Error in addTransaction:", error);
    return JsonResponse(res, {
      message: "Internal Server Error",
      status: "error",
      statusCode: 500,
      title: "Error",
    });
  }
};

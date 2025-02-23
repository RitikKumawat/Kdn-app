import { Types } from "mongoose";

export interface ITransactionModel extends Document {
  customerId: Types.ObjectId;
  paymentMode: string;
  amount: string;
  pdfPath: string;
  lastUpdatedBy: Types.ObjectId;
}

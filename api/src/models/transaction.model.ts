import { model, Model, Schema } from "mongoose";
import { ITransactionModel } from "../interfaces/models/transaction.interface";

const schema = new Schema<ITransactionModel>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    paymentMode: {
      type: String,
      enum: ["Online", "Cash"],
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    pdfPath: {
      type: String,
    },
    lastUpdatedBy: {
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

const transactionModel: Model<ITransactionModel> = model("transaction", schema);

export default transactionModel;

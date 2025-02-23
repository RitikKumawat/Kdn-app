import { model, Model, Schema } from "mongoose";
import { ICustomerModel } from "../interfaces/models/customer.interface";

const schema = new Schema<ICustomerModel>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    region: {
      type: String,
    },
    boxNumber: {
      type: String,
    },
  },
  { timestamps: true }
);

const customerModel: Model<ICustomerModel> = model("customer", schema);

export default customerModel;

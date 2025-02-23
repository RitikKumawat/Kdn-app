import { model, Model, Schema } from "mongoose";
import { IAdminModel } from "../interfaces/models/admin.interface";

const schema = new Schema<IAdminModel>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      enum: ["super-admin", "admin"],
      type: String,
      default: "admin",
    },
  },
  { timestamps: true }
);

const adminModel: Model<IAdminModel> = model("admins", schema);

export default adminModel;

import { model, Model, Schema } from "mongoose";
import { ITokenModel } from "../interfaces/models/token.interface";

const schema = new Schema<ITokenModel>(
  {
    token: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const tokenModel: Model<ITokenModel> = model("tokens", schema);

export default tokenModel;

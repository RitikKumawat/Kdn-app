import { ObjectId } from "mongodb";
import { Document } from "mongoose";

export interface ITokenModel extends Document {
  token: string;
  userId: ObjectId;
}

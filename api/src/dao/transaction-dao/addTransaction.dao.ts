import { ITransactionModel } from "../../interfaces/models/transaction.interface";
import { models } from "../../models/index.model";

export default async (data: Partial<ITransactionModel>) => {
  return await models.transaction.create(data);
};

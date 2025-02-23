import adminModel from "./admin.model";
import customerModel from "./customer.model";
import tokenModel from "./token.model";
import transactionModel from "./transaction.model";

export const models = {
  admin: adminModel,
  token: tokenModel,
  customer: customerModel,
  transaction: transactionModel,
};

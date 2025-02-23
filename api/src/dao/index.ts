import { adminDao } from "./admin-dao";
import { customer } from "./customer-dao";
import { tokenDao } from "./token-dao";
import { transactionDao } from "./transaction-dao";

export const dao = {
  adminDao: adminDao,
  token: tokenDao,
  customer: customer,
  transaction: transactionDao,
};

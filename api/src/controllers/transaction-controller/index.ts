import { addTransaction } from "./addTransaction.controller";
import { getAllTransaction } from "./getAllTransaction.controller";
import { getAnalytics } from "./getAnalytics.controller";

export const transactionController = {
  addTransaction: addTransaction,
  getTransaction: getAllTransaction,
  getAnalytics: getAnalytics,
};

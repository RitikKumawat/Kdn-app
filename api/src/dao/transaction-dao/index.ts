import addTransactionDao from "./addTransaction.dao";
import findByIdDao from "./findById.dao";

export const transactionDao = {
  addTransaction: addTransactionDao,
  findById: findByIdDao,
};

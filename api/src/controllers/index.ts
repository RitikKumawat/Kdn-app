import { adminController } from "./admin-controller";
import { authController } from "./auth";
import { customerController } from "./customers/index.controller";
import { transactionController } from "./transaction-controller";

export const controllers = {
  admin: adminController,
  auth: authController,
  customer: customerController,
  transaction: transactionController,
};

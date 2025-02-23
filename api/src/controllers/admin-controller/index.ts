import { asyncWrapper } from "../../wrapper/asyncWrapper";
import { addCustomer } from "./addCustomer.controller";
import { getAllCustomers } from "./getAllCustomer.controller";
import { getAdminData } from "./getProfile.controller";
import { uploadCustomer } from "./uploadCustomer.controller";

export const adminController = {
  getProfile: asyncWrapper(getAdminData),
  addCustomer: asyncWrapper(addCustomer),
  getAllCustomers: asyncWrapper(getAllCustomers),
  uploadCustomer: asyncWrapper(uploadCustomer),
};

import addCustomerDao from "./addCustomer.dao";
import getAllCustomersDao from "./getAllCustomers.dao";
import getCustomerByIdDao from "./getCustomerById.dao";

export const customer = {
  add: addCustomerDao,
  getAll: getAllCustomersDao,
  getById: getCustomerByIdDao,
};

import {CONSTANTS} from '../../constants/index.constants';

export const customerApis = {
  addCustomer: `${CONSTANTS.API_PREFIX}/add-customer`,
  getAllCustomers: `${CONSTANTS.API_PREFIX}/get-all-customers`,
  uploadCustomers: `${CONSTANTS.API_PREFIX}/upload-customers`,
  getCustomerDetails: `${CONSTANTS.API_PREFIX}/get-customer-details`,
};

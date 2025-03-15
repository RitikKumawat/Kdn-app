import {CONSTANTS} from '../../constants/index.constants';

export const transactionApis = {
  addTransaction: `${CONSTANTS.API_PREFIX}/add-transaction`,
  getTransaction: `${CONSTANTS.API_PREFIX}/get-transaction`,
  getAnlytics:`${CONSTANTS.API_PREFIX}/get-analytic-transaction`,
};

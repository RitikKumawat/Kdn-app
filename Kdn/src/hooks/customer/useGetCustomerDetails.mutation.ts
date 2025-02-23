import {useMutation} from '@tanstack/react-query';
import {API_URLS} from '../api-urls';
import {request} from '../../services/axios.service';

const add = async (customerId: string) => {
  const res: IServerResponse = await request({
    url: API_URLS.CUSTOMER.getCustomerDetails,
    method: 'POST',
    data: {customerId: customerId},
  });
  return res;
};

export const useGetCustomerDetails = () => {
  return useMutation({
    mutationFn: add,
  });
};

import {useMutation} from '@tanstack/react-query';
import {API_URLS} from '../api-urls';
import {request} from '../../services/axios.service';

const get = async ({customerId}: {customerId: string}) => {
  const res: IServerResponse = await request({
    url: API_URLS.TRANSACTION.getTransaction,
    method: 'POST',
    data: {customerId: customerId},
  });
  return res;
};

export const useGetTransactionMutation = () => {
  return useMutation({
    mutationFn: get,
  });
};

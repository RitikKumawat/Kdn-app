import {useMutation} from '@tanstack/react-query';
import {API_URLS} from '../api-urls';
import {request} from '../../services/axios.service';
import {INITIAL_VALUES} from '../../initial-values';

const add = async (data: typeof INITIAL_VALUES.TRANSACTION_ADD) => {
  const res: IServerResponse = await request({
    url: API_URLS.TRANSACTION.addTransaction,
    method: 'POST',
    data: data,
  });
  return res;
};

export const useAddTransactionMutation = () => {
  return useMutation({
    mutationFn: add,
  });
};

import {useMutation, useQueryClient} from '@tanstack/react-query';
import {API_URLS} from '../api-urls';
import {request} from '../../services/axios.service';
import {INITIAL_VALUES} from '../../initial-values';

const add = async (data: typeof INITIAL_VALUES.CUSTOMERADD) => {
  const res: IServerResponse = await request({
    url: API_URLS.CUSTOMER.addCustomer,
    method: 'POST',
    data: data,
  });
  return res;
};

export const useAddCustomerMutation = () => {
  const queryClient = useQueryClient(); // Access the query client

  return useMutation({
    mutationFn: add,
    onSuccess: () => {
      // Invalidate the getAllCustomers query to refetch
      queryClient.invalidateQueries({queryKey: ['get-all-customers']});
    },
  });
};

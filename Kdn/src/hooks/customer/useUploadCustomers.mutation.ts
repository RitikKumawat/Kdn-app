import {useMutation, useQueryClient} from '@tanstack/react-query';
import {API_URLS} from '../api-urls';
import {request} from '../../services/axios.service';
const add = async (data: FormData) => {
  const res: IServerResponse = await request({
    url: API_URLS.CUSTOMER.uploadCustomers,
    headers: {'Content-Type': 'multipart/form-data'},
    method: 'POST',
    data: data,
  });
  return res;
};

export const useUploadCustomers = () => {
  const queryClient = useQueryClient(); // Access the query client

  return useMutation({
    mutationFn: add,
    onSuccess: () => {
      // Invalidate the getAllCustomers query to refetch
      queryClient.invalidateQueries({queryKey: ['get-all-customers']});
    },
  });
};

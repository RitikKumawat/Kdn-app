import {useQuery} from '@tanstack/react-query';
import {request} from '../../services/axios.service';
import {API_URLS} from '../api-urls';

const get = async (data: {search: string}) => {
  const res: IServerResponse = await request({
    url: API_URLS.CUSTOMER.getAllCustomers,
    method: 'GET',
    params: {
      search: data.search,
    },
  });
  return res;
};

export const useGetAllCustomers = (data: {search: string}) => {
  return useQuery({
    queryKey: ['get-all-customers', data.search],
    queryFn: () => get(data),
  });
};

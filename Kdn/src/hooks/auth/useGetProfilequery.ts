import {useQuery} from '@tanstack/react-query';
import {request} from '../../services/axios.service';
import {API_URLS} from '../api-urls';

const get = async () => {
  const res: IServerResponse = await request({
    url: API_URLS.AUTH.getProfile,
    method: 'GET',
  });
  return res;
};

export const useGetProfileQuery = () => {
  return useQuery({queryKey: ['user', 'get-profile'], queryFn: get});
};

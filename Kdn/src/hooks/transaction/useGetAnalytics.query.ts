import {useQuery} from '@tanstack/react-query';
import {request} from '../../services/axios.service';
import {API_URLS} from '../api-urls';

const get = async () => {
  const res: IServerResponse = await request({
    url: API_URLS.TRANSACTION.getAnlytics,
    method: 'GET',
    // params: {
    //   search: data.search,
    // },
  });
  return res;
};

export const useGetAnalyticData = () => {
  return useQuery({
    queryKey: ['get-analytics'],
    queryFn: () => get(),
  });
};

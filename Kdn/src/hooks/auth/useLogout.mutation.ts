import {useMutation} from '@tanstack/react-query';
import {API_URLS} from '../api-urls';
import {request} from '../../services/axios.service';
const logout = async () => {
  const res: IServerResponse = await request({
    url: API_URLS.AUTH.logout,
    method: 'POST',
  });
  return res;
};

export const useLogoutMutation = () => useMutation({mutationFn: logout});

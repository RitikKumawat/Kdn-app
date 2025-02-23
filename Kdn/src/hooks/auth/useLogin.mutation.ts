import {useMutation} from '@tanstack/react-query';
import {API_URLS} from '../api-urls';
import {request} from '../../services/axios.service';
import {INITIAL_VALUES} from '../../initial-values';

const login = async (data: typeof INITIAL_VALUES.LOGIN) => {
  const res: IServerResponse = await request({
    url: API_URLS.AUTH.login,
    method: 'POST',
    data,
  });
  return res;
};

export const useLoginMutation = () => useMutation({mutationFn: login});

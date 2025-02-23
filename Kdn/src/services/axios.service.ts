import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {store} from '../app/store';
import {logout} from '../app/reducers/login/login-reducer';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const client = axios.create({
  baseURL: `${Config.REACT_APP_BASE_URL}`,
});

console.log('baseUrl', Config.REACT_APP_BASE_URL);

export const request = async (options: AxiosRequestConfig<any>) => {
  const token = await AsyncStorage.getItem(`${Config.REACT_APP_SECRET_KEY}`);

  client.defaults.headers.common.authorization = `Bearer ${token}`;

  const onSuccess = (response: AxiosResponse) => ({
    ...response.data,
  });

  const onError = (error: any) => {
    if (error.response.status === 401) {
      store.dispatch(logout());
    }

    return error.response.data;
  };

  try {
    const res = await client(options);
    return onSuccess(res);
  } catch (error) {
    return onError(error);
  }
};

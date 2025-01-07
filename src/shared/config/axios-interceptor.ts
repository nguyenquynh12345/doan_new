import { logout } from '@/components/modules/auth/auth.reducer';
import { ToastError } from '@/components/shared/toast/Toast';
import i18n from '@/i18n/config';
import store from '@/store';
import axios from 'axios';
import { IResponse } from '../shared-interfaces';
import { SERVER_API_URL, SERVER_TYPE, SERVER_VERSON } from './constants';

const TIMEOUT = 1 * 60 * 1000;
const BASE_URL = `${SERVER_API_URL}${SERVER_TYPE}${SERVER_VERSON}`;
let isRefreshing = false;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = BASE_URL;

const axiosFactory = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});

const onRequestSuccess = (config: any) => {
  const token = localStorage.getItem('authentication_token') || sessionStorage.getItem('authentication_token');
  if (token && token !== 'null') {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const onResponseSuccess = (response: any) => response;

// const onResponseError = (err: any) => {
//   const status = err.status || (err.response ? err.response.status : 0);
//     if (status >= 400 && status < 500) {
//       handleClientErrors(err.response);
//     }
//     return Promise.reject(err);
// };

const refreshTheToken = async (refreshToken: string) => {
  try {
    const response = await axios.get<
      IResponse<{
        access_token: string;
        refresh_token: string;
      }>
    >(`${BASE_URL}auth/refresh`, { params: { refreshToken } });
    const access_token = response.data.data.access_token;
    const refresh_token = response.data.data.refresh_token;
    localStorage.setItem('authentication_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    return access_token;
  } catch (e) {
    return Promise.reject(e);
  } finally {
    isRefreshing = false;
  }
};

const onResponseError = async (err: any) => {
  const originalRequest = err.config;
  const refreshToken = localStorage.getItem('refresh_token') || sessionStorage.getItem('refresh_token');

  if (err?.response?.status === 401 && refreshToken && !isRefreshing) {
    isRefreshing = true;
    try {
      const access_token = await refreshTheToken(refreshToken);
      // Re-run the original request that was intercepted
      originalRequest.headers.Authorization = `Bearer ${access_token}`;
      return axiosFactory(originalRequest);
    } catch (error) {
      // logpout if refresh token invalid
      store.dispatch(logout());
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }

  let errorMessage = '';
  if (err?.response && err?.response?.data && err?.response?.data?.message) {
    errorMessage = i18n.t(`api_errors.${err?.response?.data?.code}`) || err?.response?.data?.message;
  } else {
    errorMessage = err.message || err?.code;
  }
  ToastError(errorMessage);
  return Promise.reject(err);
};

axiosFactory.interceptors.request.use(onRequestSuccess);
axiosFactory.interceptors.response.use(onResponseSuccess, onResponseError);

export default axiosFactory;

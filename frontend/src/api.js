import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: 'https://bbak.mkhitaryan.pw/',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');

    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (config) => config,
  /** @param {AxiosError} error */
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('account_type');
    }

    // location.reload();

    return Promise.reject(error);
  }
);

export default api;

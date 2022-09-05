import * as Axios from 'axios';
import Cookies from 'universal-cookie';

export const axios = Axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'http://54.204.72.174/api/v1'
      : 'http://localhost:8080/api/v1',
  headers: { 'Content-type': 'application/json' },
});

axios.interceptors.request.use(
  (config) => {
    const cookies = new Cookies();

    console.log(`%cMaking request to /${config.url}`, 'color: #73a9ff');

    if (config.url === '/' || config.url.indexOf('/refreshToken') >= 0) {
      return config;
    }

    const token = cookies.get('accessToken');

    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    };
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

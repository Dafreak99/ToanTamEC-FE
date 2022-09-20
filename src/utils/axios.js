import * as Axios from 'axios';
import jwtDecode from 'jwt-decode';
import Cookies from 'universal-cookie';

export const axios = Axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://toantam.tk/api/v1'
      : 'http://localhost:8080/api/v1',
  headers: { 'Content-type': 'application/json' },
  withCredentials: true,
});

axios.interceptors.request.use(
  async (config) => {
    const cookies = new Cookies();

    console.log(`%cMaking request to /${config.url}`, 'color: #73a9ff');

    if (config.url === '/' || config.url.indexOf('/user/refresh-token') >= 0) {
      return config;
    }

    let token = cookies.get('accessToken');

    if (token) {
      const { exp } = jwtDecode(token);

      if (exp * 1000 <= Date.now()) {
        console.log('%cExpired! Perform slient refresh', 'color: #ffc852');

        try {
          const {
            data: { accessToken },
          } = await axios.post('/user/refresh-token');
          cookies.set('accessToken', accessToken);
          token = accessToken;
        } catch (error) {
          if (error.response.status === 401) {
            cookies.remove('accessToken');
            window.location.href = '/';
          }
        }
      }
    }

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

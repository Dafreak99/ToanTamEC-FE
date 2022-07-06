import * as Axios from "axios";
import Cookies from "universal-cookie";

export const axios = Axios.create({
  baseURL: "http://localhost:8080/api/",
  headers: { "Content-type": "application/json" },
});

axios.interceptors.request.use(
  function (config) {
    const cookies = new Cookies();

    console.log(`%cMaking request to /${config.url}`, "color: #73a9ff");

    if ((config.url === "/") | (config.url.indexOf("/refreshToken") >= 0)) {
      return config;
    }

    const token = cookies.get("accessToken");

    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    };
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

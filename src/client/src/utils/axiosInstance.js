// axiosInstance.js
import axios from "axios";
import { Store } from "../redux/store/store";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const state = Store.getState();
    const { jwt } = state.auth;
    if (jwt) {
      config.headers.Authorization = jwt;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

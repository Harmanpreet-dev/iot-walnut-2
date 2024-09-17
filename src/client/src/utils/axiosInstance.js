import axios from "axios";
import { Store } from "../redux/store/store";
import { notifyUser } from "./notifyUser";
import { LOGOUT } from "./../redux/actions/authActions";
import { LOADING } from "../redux/actions/loaderAction";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    Store.dispatch(LOADING(true));
    const state = Store.getState();
    const { jwt } = state.auth;
    if (jwt) {
      config.headers.Authorization = `Bearer ${jwt}`;
    }
    return config;
  },
  (err) => {
    Store.dispatch(LOADING(false));
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    Store.dispatch(LOADING(false));
    return response;
  },
  (err) => {
    const { data, status } = err?.response || {};
    const { error, message } = data || {
      error: "Something went wrong",
    };
    const errMessage =
      error || message || err?.message || "Something went wrong";
    notifyUser({ message: errMessage, type: "error" });
    Store.dispatch(LOADING(false));
    if (status === 401) {
      Store.dispatch(LOGOUT());
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;

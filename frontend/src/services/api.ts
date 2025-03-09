import axios from "axios";
import { parseCookies } from "nookies";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: process.env.NEXT_BASE_URL || "http://localhost:3000",
});

api.interceptors.request.use(
  (config) => {
    const cookies = parseCookies();

    if (cookies["animedex.token"]) {
      config.headers.Authorization = `Bearer ${cookies["animedex.token"]}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error) => {
    toast.error(error.response.data?.error?.message);
    return Promise.reject(error);
  }
);

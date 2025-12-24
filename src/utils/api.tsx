import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "./apis/BASE_URL";
import { resetToAuth } from "../navigation/NavigationService";
import store from "../redux/store";
import { logoutUser } from "../redux/slices/authSlice";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;
    const originalRequest = error.config;

    if (status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;

      await store.dispatch(logoutUser()); 
      resetToAuth();
    }

    return Promise.reject(error);
  }
);

export default api;

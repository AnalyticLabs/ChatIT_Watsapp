// import axios from "axios";
// import { EXPO_BACKEND_URL } from "@env";

// const axiosInstance = axios.create({
//   baseURL: EXPO_BACKEND_URL,
//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default axiosInstance;

import axios from "axios";
import { EXPO_BACKEND_URL } from "@env";
import { store } from "~/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuthFromStorage } from "~/utils/authStorage";

const axiosInstance = axios.create({
  baseURL: EXPO_BACKEND_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const authData = await getAuthFromStorage();
    if (authData?.token) {
      config.headers.Authorization = `Bearer ${authData.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;

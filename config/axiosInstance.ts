import axios from "axios";
import { EXPO_BACKEND_URL } from "@env";

const axiosInstance = axios.create({
  baseURL: EXPO_BACKEND_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;

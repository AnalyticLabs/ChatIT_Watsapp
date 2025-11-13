// src/api/apiConfig.ts
const API_BASE_URL = 'http://13.235.83.139:3001/api/'; // 👈 your base API URL

export const apiConfig = {
  BASE_URL: API_BASE_URL,
  AUTH: `${API_BASE_URL}auth/`,
  USER: `${API_BASE_URL}user/`,
  APPOINTMENT: `${API_BASE_URL}appointments/`,
};

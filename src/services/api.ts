import axios from "axios";
const SERVER = "http://YOUR_SERVER_IP:4000";

export const api = axios.create({
  baseURL: SERVER,
  timeout: 15000
});

export function setAuthToken(token?: string) {
  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete api.defaults.headers.common["Authorization"];
}

import axios from 'axios';
const API_BASE = 'http://13.235.83.139:3001/api';
const client = axios.create({ baseURL: API_BASE });
export default client;

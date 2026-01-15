import axios from "axios";

 export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 30000,
  headers: {
        'Content-Type': 'application/json',
    },
});
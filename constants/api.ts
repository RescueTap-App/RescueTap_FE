import axios from "axios";

export const API_URL = "https://plankton-app-nj7zb.ondigitalocean.app";
export const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

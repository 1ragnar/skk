import axios from "axios";

export const API_HOST = process.env.REACT_APP_API_HOST;

const api = axios.create({
  baseURL: API_HOST,
});

api.interceptors.request.use(async (config: any) => {
  try {
    const token = await localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (exception) {}
  return config;
});

export { api };

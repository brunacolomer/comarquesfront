import axios from "axios";
import * as SecureStore from "expo-secure-store";

const API = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
});

// Funció per establir el token manualment (opcional)
export const setAuthToken = (token: string | null) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

// Interceptor que afegeix el token abans de cada petició
API.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("session");
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;

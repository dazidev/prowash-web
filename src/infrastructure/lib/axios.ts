import { API } from "@/interfaces";
import axios from "axios";

const api = axios.create({
  baseURL: `${API}/api`,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: any[] = [];
let accessTokenMemory: string | null = null; // Tu "fuente de verdad" en memoria

// Esta es la función que llamarás desde el useEffect de tu AuthContext
export const setAccessTokenForRequests = (token: string | null) => {
  accessTokenMemory = token;
};

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

// 1. INTERCEPTOR DE PETICIÓN
api.interceptors.request.use(
  (config) => {
    // Siempre sacamos el token de la variable de memoria actualizada
    if (accessTokenMemory) {
      config.headers.Authorization = `Bearer ${accessTokenMemory}`;
      console.log(accessTokenMemory);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 2. INTERCEPTOR DE RESPUESTA
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            console.log(token);
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post(
          `${API}/api/auth/refresh`,
          {},
          { withCredentials: true },
        );

        const nuevoToken = data.accessToken;

        // AJUSTE CLAVE: Actualizamos la variable de memoria
        // para que las próximas peticiones usen el nuevo token
        setAccessTokenForRequests(nuevoToken);

        // También lo inyectamos en la petición que acaba de fallar
        originalRequest.headers["Authorization"] = `Bearer ${nuevoToken}`;

        processQueue(null, nuevoToken);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        setAccessTokenForRequests(null); // Limpiamos memoria si falla todo

        if (typeof window !== "undefined") {
          // Aquí podrías disparar un evento personalizado para que el Context
          // sepa que debe poner el estado del token en null
          const isAuthPath = window.location.pathname.startsWith("/auth");

          if (!isAuthPath) {
            window.location.href = "/auth/login";
          }
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;

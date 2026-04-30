import { API } from "@/interfaces";
import axios from "axios";
import { getSession, signOut } from "next-auth/react";
import { auth } from "./auth";

const api = axios.create({
  baseURL: `${API}/api`,
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  let token: string | undefined;

  if (typeof window === "undefined") {
    // --- ESTAMOS EN EL SERVIDOR ---
    // (Server Actions o Server Components)
    const session = await auth();
    token = session?.accessToken;
  } else {
    // --- ESTAMOS EN EL CLIENTE ---
    // (Eventos de botones, useEffect, etc.)
    const session = await getSession();
    token = session?.accessToken;
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        signOut({ callbackUrl: "/auth/login" });
      }
    }
    return Promise.reject(error);
  },
);

export default api;

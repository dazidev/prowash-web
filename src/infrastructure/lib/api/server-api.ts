import "server-only";

import { API } from "@/interfaces";
import axios from "axios";
import { auth } from "../auth";

export const serverApi = axios.create({
  baseURL: `${API}/api`,
});

serverApi.interceptors.request.use(async (config) => {
  const session = await auth();

  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }

  return config;
});

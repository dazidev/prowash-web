import { ApiError } from "@/interfaces";
import axios from "axios";

export const getAxiosError = (error: unknown): string | null => {
  if (axios.isAxiosError<ApiError>(error)) {
    const message = error.response?.data?.message;

    return Array.isArray(message)
      ? message.join(", ")
      : (message ?? "Request failed");
  }
  return null;
};

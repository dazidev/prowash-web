import { isAxiosError } from "axios";
import type { ApiError } from "@/interfaces";

export function getErrorMessage(error: unknown): string {
  if (isAxiosError<ApiError>(error)) {
    if (error.response) {
      const message = error.response.data?.message;

      if (typeof message === "string" && message.trim()) {
        return message;
      }

      if (Array.isArray(message)) {
        const messages = message.filter(
          (item): item is string =>
            typeof item === "string" && item.trim().length > 0,
        );

        if (messages.length > 0) {
          return messages.join(" ");
        }
      }

      return "Server error";
    }

    if (error.request) {
      return "Network error";
    }
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string" &&
    error.message.trim()
  ) {
    return error.message;
  }

  return "Unknown error";
}

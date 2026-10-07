"use server";
import { serverApi } from "@/infrastructure/lib/api/server-api";
import {
  ActionResponse,
  ApiError,
  WebQuoteRequest,
  WebQuoteRequestStatus,
} from "@/interfaces";
import { isAxiosError } from "axios";

export async function getUserQuotes() {
  try {
    const res = await serverApi.get("/memberships/quotes");
    return res?.data ?? [];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getWebQuotes(
  status?: WebQuoteRequestStatus,
): Promise<ActionResponse<WebQuoteRequest[]>> {
  try {
    const response = await serverApi.get<WebQuoteRequest[]>(
      "/memberships/web-quotes",
      {
        params: { status },
      },
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: getWebQuoteErrorMessage(
        error,
        "Unable to load website quote requests.",
      ),
    };
  }
}

export async function getWebQuote(
  id: string,
): Promise<ActionResponse<WebQuoteRequest>> {
  try {
    const response = await serverApi.get<WebQuoteRequest>(
      `/memberships/web-quotes/${id}`,
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: getWebQuoteErrorMessage(
        error,
        "Unable to load the quote request.",
      ),
    };
  }
}

export async function updateWebQuoteStatus(
  id: string,
  status: WebQuoteRequestStatus,
): Promise<ActionResponse<WebQuoteRequest>> {
  try {
    const response = await serverApi.patch<WebQuoteRequest>(
      `/memberships/web-quotes/${id}/status`,
      { status },
    );

    return {
      success: true,
      message: "Quote request status updated successfully.",
      data: response.data,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: getWebQuoteErrorMessage(
        error,
        "Unable to update the quote request status.",
      ),
    };
  }
}

function getWebQuoteErrorMessage(error: unknown, fallback: string): string {
  if (isAxiosError<ApiError>(error) && error.response) {
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
  }

  return fallback;
}

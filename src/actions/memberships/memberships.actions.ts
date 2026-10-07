"use server";
import { serverApi } from "@/infrastructure/lib/api/server-api";
import {
  ActionResponse,
  ApiError,
  PackageOrderPurchaseStatus,
  PackageOrderQuote,
  PackageOrderStatusUpdated,
  WebQuoteRequest,
  WebQuoteRequestStatus,
} from "@/interfaces";
import { isAxiosError } from "axios";

export async function getUserQuotes(
  purchaseStatus?: PackageOrderPurchaseStatus,
): Promise<PackageOrderQuote[]> {
  try {
    const response = await serverApi.get<PackageOrderQuote[]>(
      "/memberships/quotes",
      {
        params: { purchaseStatus },
      },
    );

    return response.data;
  } catch (error: unknown) {
    console.log(error);
    return [];
  }
}

export async function updateUserQuoteStatus(
  id: string,
  purchaseStatus: PackageOrderPurchaseStatus,
): Promise<ActionResponse<PackageOrderStatusUpdated>> {
  try {
    const response = await serverApi.patch<PackageOrderStatusUpdated>(
      `/memberships/quotes/${id}/status`,
      { purchaseStatus },
    );

    return {
      success: true,
      message: "App quote request status updated successfully.",
      data: response.data,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: getQuoteErrorMessage(
        error,
        "Unable to update the app quote request status.",
      ),
    };
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
      message: getQuoteErrorMessage(
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
      message: getQuoteErrorMessage(error, "Unable to load the quote request."),
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
      message: getQuoteErrorMessage(
        error,
        "Unable to update the quote request status.",
      ),
    };
  }
}

function getQuoteErrorMessage(error: unknown, fallback: string): string {
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

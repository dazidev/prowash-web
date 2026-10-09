"use server";
import { serverApi } from "@/infrastructure/lib/api/server-api";
import {
  ActionResponse,
  ApiError,
  AssignUserQuoteAppointmentPayload,
  PackageOrderAppointmentUpdated,
  PackageOrderFinalPriceUpdated,
  PackageOrderPurchaseStatus,
  PackageOrderQuote,
  PackageOrderStatusUpdated,
  SetUserQuoteFinalPricePayload,
  WebQuoteRequest,
  WebQuoteRequestStatus,
} from "@/interfaces";
import { isAxiosError } from "axios";

export async function getUserQuotes(
  purchaseStatus?: PackageOrderPurchaseStatus,
): Promise<ActionResponse<PackageOrderQuote[]>> {
  try {
    const response = await serverApi.get<PackageOrderQuote[]>(
      "/memberships/quotes",
      {
        params: { purchaseStatus },
      },
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error: unknown) {
    return {
      success: false,
      statusCode: getQuoteErrorStatus(error),
      message: getQuoteErrorMessage(
        error,
        "Unable to load app quote requests.",
      ),
    };
  }
}

export async function updateUserQuoteStatus(
  id: string,
  purchaseStatus: PackageOrderPurchaseStatus,
  expectedQuote: Pick<PackageOrderQuote, "purchaseStatus" | "updatedAt">,
): Promise<ActionResponse<PackageOrderStatusUpdated>> {
  try {
    const response = await serverApi.patch<PackageOrderStatusUpdated>(
      `/memberships/quotes/${id}/status`,
      {
        purchaseStatus,
        expectedPurchaseStatus: expectedQuote.purchaseStatus,
        expectedUpdatedAt: expectedQuote.updatedAt,
      },
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
      statusCode: getQuoteErrorStatus(error),
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

export async function assignUserQuoteAppointment(
  id: string,
  payload: AssignUserQuoteAppointmentPayload,
): Promise<ActionResponse<PackageOrderAppointmentUpdated>> {
  try {
    const response = await serverApi.patch<PackageOrderAppointmentUpdated>(
      `/memberships/quotes/${id}/appointment`,
      payload,
    );

    return {
      success: true,
      message: "Appointment saved successfully.",
      data: response.data,
    };
  } catch (error: unknown) {
    return {
      success: false,
      statusCode: getQuoteErrorStatus(error),
    };
  }
}

export async function setUserQuoteFinalPrice(
  id: string,
  payload: SetUserQuoteFinalPricePayload,
): Promise<ActionResponse<PackageOrderFinalPriceUpdated>> {
  try {
    const response = await serverApi.patch<PackageOrderFinalPriceUpdated>(
      `/memberships/quotes/${id}/final-price`,
      payload,
    );

    return {
      success: true,
      message: "Final quote price saved successfully.",
      data: response.data,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: getQuoteErrorMessage(
        error,
        "Unable to save the final quote price.",
      ),
      statusCode: getQuoteErrorStatus(error),
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

function getQuoteErrorStatus(error: unknown): number | undefined {
  return isAxiosError(error) ? error.response?.status : undefined;
}

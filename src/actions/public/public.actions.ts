"use server";

import { serverApi } from "@/infrastructure/lib/api/server-api";
import {
  ActionResponse,
  API,
  ApiError,
  CreateWebQuotePayload,
  PublicPackage,
  Review,
  WebQuoteCreated,
} from "@/interfaces";
import { isAxiosError } from "axios";

interface FormContact {
  name: string;
  lastname: string;
  email: string;
  zipcode: string;
  phone: string;
  comments: string;
}

export async function getReviews(): Promise<Review[] | undefined> {
  try {
    const response = await fetch(`${API}/api/public/reviews`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    const res: Review[] = await response.json();

    return res;
  } catch {
    return undefined;
  }
}

export async function getContacts() {
  try {
    const res = await serverApi.get("/public/contacts");

    return res?.data ?? [];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function changeContactStatus(
  id: string,
): Promise<ActionResponse<undefined>> {
  try {
    await serverApi.patch(`/public/contact/${id}/status`);
    return {
      success: true,
      message: "The contact state has changed successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "There are an error changing the contact state",
    };
  }
}

export async function sendContact(
  form: FormContact,
): Promise<ActionResponse<undefined>> {
  try {
    await serverApi.post(`/public/contact`, form);
    return {
      success: true,
      message: "The contact state has sent successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "There are an error sending the contact",
    };
  }
}

export async function deleteContact(
  id: string,
): Promise<ActionResponse<undefined>> {
  try {
    await serverApi.delete(`/public/contact/${id}`);
    return {
      success: true,
      message: "The contact has deleted successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "There are an error deleting the contact",
    };
  }
}

export async function getPublicPackages(): Promise<PublicPackage[]> {
  try {
    const response = await fetch(`${API}/api/public/packages`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return [];
    }

    const packages: PublicPackage[] = await response.json();

    return packages;
  } catch (error: unknown) {
    console.log(error);
    return [];
  }
}

export async function sendWebQuote(
  form: CreateWebQuotePayload,
): Promise<ActionResponse<WebQuoteCreated>> {
  const fallbackMessage =
    "Unable to send your quote request. Please try again.";

  try {
    const payload: CreateWebQuotePayload = {
      name: form.name.trim(),
      lastname: form.lastname?.trim() || undefined,
      email: form.email.trim(),
      phone: form.phone.trim(),
      zipcode: form.zipcode?.trim() || undefined,
      comments: form.comments.trim(),
      packageId: form.packageId,
      packagePriceId: form.packagePriceId,
    };

    const response = await serverApi.post<WebQuoteCreated>(
      "/public/web-quotes",
      payload,
    );

    return {
      success: true,
      message:
        "Thank you! We have received your quote request. We will contact you shortly.",
      data: response.data,
    };
  } catch (error: unknown) {
    if (isAxiosError<ApiError>(error) && error.response) {
      const message = error.response.data?.message;

      if (typeof message === "string" && message.trim()) {
        return {
          success: false,
          message,
        };
      }

      if (Array.isArray(message)) {
        const messages = message.filter(
          (item): item is string =>
            typeof item === "string" && item.trim().length > 0,
        );

        if (messages.length > 0) {
          return {
            success: false,
            message: messages.join(" "),
          };
        }
      }
    }

    return {
      success: false,
      message: fallbackMessage,
    };
  }
}

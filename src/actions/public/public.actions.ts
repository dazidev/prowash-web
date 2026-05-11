"use server";

import { serverApi } from "@/infrastructure/lib/api/server-api";
import { ActionResponse, API, Review } from "@/interfaces";

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
  } catch (error: unknown) {
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

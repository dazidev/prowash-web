"use server";

import { ApiResponse } from "@/infrastructure";
import { API, Review } from "@/interfaces";

export async function getReviews(): Promise<any> {
  try {
    const response = await fetch(`${API}/api/public/reviews`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    const res: ApiResponse<Review[]> = await response.json();

    if (!res.success) throw res;
    return res;
  } catch (error: unknown) {
    return error;
  }
}

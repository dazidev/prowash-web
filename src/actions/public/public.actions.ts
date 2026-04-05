"use server";

import { ApiResponse } from "@/infrastructure";
import { API, Review } from "@/interfaces";

export async function getReviews(): Promise<ApiResponse<Review[] | undefined>> {
  try {
    const response = await fetch(`${API}/api/public/reviews`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    const res: ApiResponse<Review[]> = await response.json();

    if (!res.success) throw res.error;
    return res;
  } catch (error: unknown) {
    return {
      success: false,
    };
  }
}

import { ApiResponse, HOSTNAME } from "@/infrastructure";
import { Review } from "@/interfaces";

export async function getReviews(): Promise<any> {
  try {
    const response = await fetch(`${HOSTNAME}/api/public/reviews`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    const res: ApiResponse<Review[]> = await response.json();

    if (!res.success) throw res;
    return res;
  } catch (error: any) {
    return error;
  }
}

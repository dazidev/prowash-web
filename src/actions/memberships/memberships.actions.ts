"use server";
import { serverApi } from "@/infrastructure/lib/api/server-api";

export async function getUserQuotes() {
  try {
    const res = await serverApi.get("/memberships/quotes");
    return res?.data ?? [];
  } catch (error) {
    console.log(error);
    return [];
  }
}

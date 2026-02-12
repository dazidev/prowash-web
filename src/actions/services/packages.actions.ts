"use server";
import { regex } from "@/domain";
import { ApiResponse, HOSTNAME, PServiceItem } from "@/infrastructure";

export async function getPackageServices(): Promise<PServiceItem[] | any> {
  try {
    const response = await fetch(`${HOSTNAME}/api/services`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    const res: ApiResponse<PServiceItem[]> = await response.json();

    if (!res.success) throw res;
    return res;
  } catch (error: any) {
    return error;
  }
}

export async function createPackageService(name: string) {
  try {
    const response = await fetch(`${HOSTNAME}/api/services/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    const res: ApiResponse<PServiceItem> = await response.json();

    return {
      ...res,
      message: "The package service has been created successfully",
    };
  } catch (error: any) {
    return error;
  }
}

export async function deletePackageService(id: string) {
  if (!regex.uuidv4.test(id))
    return {
      success: false,
      error: {
        code: "INVALID_ID",
        message: "Invalid Id",
      },
    };

  try {
    const response = await fetch(`${HOSTNAME}/api/services/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const res: ApiResponse<undefined> = await response.json();

    return {
      ...res,
      message: "The package service has been deleted successfully",
    };
  } catch (error: any) {
    return error;
  }
}

export async function updatePackageService(id: string, name: string) {
  if (!regex.uuidv4.test(id))
    return {
      success: false,
      error: {
        code: "INVALID_ID",
        message: "Invalid Id",
      },
    };

  try {
    const response = await fetch(`${HOSTNAME}/api/services/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    const res: ApiResponse<PServiceItem> = await response.json();

    return {
      ...res,
      message: "The package service has been updated successfully",
    };
  } catch (error: any) {
    return error;
  }
}

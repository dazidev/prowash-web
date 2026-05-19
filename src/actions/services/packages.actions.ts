"use server";
import { regex } from "@/domain";
import {
  getAxiosError,
  PackageRangeItem,
  PServiceItem,
} from "@/infrastructure";
import { ActionResponse } from "@/interfaces";
import { PackageResponse } from "../../infrastructure/http/interface";
import { serverApi } from "@/infrastructure/lib/api/server-api";

export async function getPackageServices(): Promise<
  ActionResponse<PServiceItem[]>
> {
  try {
    const response = await serverApi.get("/catalog/services");

    return {
      success: true,
      data: response.data,
    };
  } catch (error: unknown) {
    console.log(error);
    const message = getAxiosError(error);
    return {
      success: false,
      message: message ?? "An error occurred while getting the services.",
    };
  }
}

export async function createPackageService(
  name: string,
): Promise<ActionResponse<PServiceItem>> {
  try {
    await serverApi.post("/catalog/service", { name });

    return {
      success: true,
      message: "The package service has been created successfully",
    };
  } catch (error: unknown) {
    console.log(error);
    const message = getAxiosError(error);
    return {
      success: false,
      message: message ?? "An error occurred while creating the service.",
    };
  }
}

export async function deletePackageService(
  id: string,
): Promise<ActionResponse<undefined>> {
  if (!regex.uuidv4.test(id))
    return {
      success: false,
      message: "Invalid id",
    };

  try {
    await serverApi.delete(`/catalog/service/${id}`);

    return {
      success: true,
      message: "The package service has been deleted successfully",
    };
  } catch (error: unknown) {
    console.log(error);
    const message = getAxiosError(error);
    return {
      success: false,
      message: message ?? "An error occurred while deleting the service.",
    };
  }
}

export async function updatePackageService(
  id: string,
  name: string,
): Promise<ActionResponse<PServiceItem>> {
  if (!regex.uuidv4.test(id))
    return {
      success: false,
      message: "Invalid id",
    };

  try {
    const response = await serverApi.patch(`/catalog/service/${id}`, { name });

    return {
      success: true,
      data: response.data,
      message: "The package service has been updated successfully",
    };
  } catch (error: unknown) {
    console.log(error);
    const message = getAxiosError(error);
    return {
      success: false,
      message: message ?? "An error occurred while updating the service.",
    };
  }
}

//* Package ranges

export async function getPackageRanges(): Promise<
  ActionResponse<PackageRangeItem[]>
> {
  try {
    const response = await serverApi.get("/catalog/ranges");

    return {
      success: true,
      data: response.data,
    };
  } catch (error: unknown) {
    console.log(error);
    const message = getAxiosError(error);
    return {
      success: false,
      message: message ?? "An error occurred while getting the ranges.",
    };
  }
}

export async function createPackageRange(
  description: string,
): Promise<ActionResponse<PackageRangeItem>> {
  try {
    await serverApi.post("/catalog/range", {
      description,
      unit: "ft2",
    });

    return {
      success: true,
      message: "The package range has been created successfully",
    };
  } catch (error: unknown) {
    console.log(error);
    const message = getAxiosError(error);
    return {
      success: false,
      message: message ?? "An error occurred while creating the range.",
    };
  }
}

export async function deletePackageRange(
  id: string,
): Promise<ActionResponse<undefined>> {
  if (!regex.uuidv4.test(id))
    return {
      success: false,
      message: "Invalid id",
    };

  try {
    const response = await serverApi.delete(`/catalog/range/${id}`);

    return {
      success: true,
      message: "The package range has been deleted successfully",
    };
  } catch (error: unknown) {
    console.log(error);
    const message = getAxiosError(error);
    return {
      success: false,
      message: message ?? "An error occurred while deleting the range.",
    };
  }
}

export async function updatePackageRange(
  id: string,
  description: string,
): Promise<ActionResponse<PackageRangeItem>> {
  if (!regex.uuidv4.test(id))
    return {
      success: false,
      message: "Invalid id",
    };

  try {
    const response = await serverApi.patch(`/catalog/range/${id}`, {
      description,
      unit: "ft2",
    });

    return {
      success: true,
      message: "The package range has been updated successfully",
    };
  } catch (error: unknown) {
    console.log(error);
    const message = getAxiosError(error);
    return {
      success: false,
      message: message ?? "An error occurred while deleting the range.",
    };
  }
}

//* Packages

export async function getPackages(): Promise<
  ActionResponse<PackageResponse[]>
> {
  try {
    const response = await serverApi.get("/catalog/packages");

    return {
      success: true,
      data: response.data,
    };
  } catch (error: unknown) {
    console.log(error);
    const message = getAxiosError(error);
    return {
      success: false,
      message: message ?? "An error occurred while getting the packages.",
    };
  }
}

export async function createPackage(
  data: object,
): Promise<ActionResponse<object>> {
  try {
    await serverApi.post("/catalog/package", data);

    return {
      success: true,
      message: "The package has been created successfully",
    };
  } catch (error: unknown) {
    console.log(error);
    const message = getAxiosError(error);
    return {
      success: false,
      message: message ?? "An error occurred while creating the package.",
    };
  }
}

export async function deletePackage(
  id: string,
): Promise<ActionResponse<undefined>> {
  if (!regex.uuidv4.test(id))
    return {
      success: false,
      message: "Invalid id",
    };

  try {
    const response = await serverApi.delete(`/catalog/package/${id}`);

    return {
      success: true,
      message: "The package has been deleted successfully",
    };
  } catch (error: unknown) {
    console.log(error);
    const message = getAxiosError(error);
    return {
      success: false,
      message: message ?? "An error occurred while deleting the package.",
    };
  }
}

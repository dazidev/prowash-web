"use server";

import { AdminForm, getAxiosError } from "@/infrastructure";
import { serverApi } from "@/infrastructure/lib/api/server-api";
import { ActionResponse, API, ApiError } from "@/interfaces";
import axios from "axios";

export async function getAdmins() {
  try {
    const res = await serverApi.get("/admin");
    return res?.data ?? [];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function createAdmin(
  adminData: AdminForm,
): Promise<ActionResponse<undefined>> {
  try {
    const res = await serverApi.post("/admin", adminData);

    return {
      success: true,
      data: res.data,
      message: "The administrator has been created successfully",
    };
  } catch (error: unknown) {
    console.log(error);
    const message = getAxiosError(error);
    return {
      success: false,
      message: message ?? "An error occurred while creating the administrator.",
    };
  }
}

export async function deleteAdmin(
  id: string,
): Promise<ActionResponse<undefined>> {
  try {
    await serverApi.delete(`/admin/${id}`);

    return {
      success: true,
      message: "The administrator has been deleted successfully",
    };
  } catch (error: unknown) {
    console.log(error);
    const message = getAxiosError(error);
    return {
      success: false,
      message: message ?? "An error occurred while deleting the administrator.",
    };
  }
}

export async function editAdmin(
  id: string,
  adminData: AdminForm,
): Promise<ActionResponse<undefined>> {
  const data = {
    name: adminData.name,
    lastname: adminData.lastname,
    email: adminData.email,
    roles: adminData.roles[0],
  };

  try {
    await serverApi.patch(`/admin/${id}`, data);

    return {
      success: true,
      message: "The administrator has been updated successfully",
    };
  } catch (error: unknown) {
    console.log(error);
    const message = getAxiosError(error);
    return {
      success: false,
      message: message ?? "An error occurred while updating the administrator.",
    };
  }
}

export async function changeAdminPassword(
  id: string,
  password: string,
): Promise<ActionResponse<undefined>> {
  try {
    await serverApi.patch(`/admin/password/${id}`, { password });

    return {
      success: true,
      message: "The administrator has been updated successfully",
    };
  } catch (error: unknown) {
    console.log(error);
    const message = getAxiosError(error);
    return {
      success: false,
      message: message ?? "An error occurred while updating the administrator.",
    };
  }
}

"use client";

import { ActionResponse, ApiError, LoginResponse } from "@/interfaces";
import api from "@/infrastructure/lib/axios";
import { getErrorMessage } from "@/infrastructure";

export async function loginUser(
  formData: FormData,
): Promise<ActionResponse<LoginResponse | ApiError>> {
  let deviceId = localStorage.getItem("deviceId");
  const userAgent = navigator.userAgent;

  if (!deviceId) {
    deviceId = crypto.randomUUID();
    localStorage.setItem("deviceId", deviceId);
  }

  const body = {
    email: formData.get("email"),
    password: formData.get("password"),
    deviceId,
    deviceInfo: userAgent,
  };

  try {
    const res = await api.post("/auth/login", body);
    if (res.status === 201) {
      const data: LoginResponse = res.data;

      return {
        success: true,
        data,
      };
    } else {
      const data: ApiError = res.data;
      throw new Error(data.message);
    }
  } catch (error) {
    const message = getErrorMessage(error);
    return {
      success: false,
      message: message,
    };
  }
}

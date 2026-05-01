"use server";

import { signIn } from "@/infrastructure/lib/auth";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

interface Data {
  email: string;
  password: string;
  deviceId: string;
  deviceInfo: string;
}

export async function authenticate(data: Data) {
  try {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      deviceId: data.deviceId,
      deviceInfo: data.deviceInfo,
      redirectTo: "/crm/home",
    });
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return {
          ok: false,
          message: "Invalid credentials",
        };
      }

      return {
        ok: false,
        message: "Something went wrong",
      };
    }

    throw error;
  }
}

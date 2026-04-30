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
  const { email, password, deviceId, deviceInfo } = data;

  try {
    await signIn("credentials", {
      email,
      password,
      deviceId,
      deviceInfo,
      redirectTo: "/crm/home", // 👈 ponlo aquí
    });
  } catch (error) {
    if (isRedirectError(error)) throw error; // 👈 deja pasar el redirect

    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials";
        default:
          return "Something went wrong";
      }
    }

    throw error;
  }
}

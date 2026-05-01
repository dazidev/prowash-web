"use server";

import { signOut } from "@/infrastructure/lib/auth";

export const logout = async () => {
  await signOut({
    redirectTo: "/auth/login",
  });
};

"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useRef } from "react";

export const SessionGuard = () => {
  const { data: session, status, update } = useSession();
  const running = useRef(false);

  useEffect(() => {
    if (status !== "authenticated" || running.current) return;

    if (session?.error) {
      running.current = true;
      void signOut({ callbackUrl: "/auth/login" });
      return;
    }

    if (!session?.needsSessionSync) return;

    running.current = true;

    void update({})
      .then((updated) => {
        if (!updated || updated.error) {
          return signOut({ callbackUrl: "/auth/login" });
        }
      })
      .catch(() => signOut({ callbackUrl: "/auth/login" }))
      .finally(() => {
        running.current = false;
      });
  }, [session?.error, session?.needsSessionSync, status, update]);

  return null;
};

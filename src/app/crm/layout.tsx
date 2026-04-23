"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/infrastructure/lib/axios";
import { TopNav } from "@/components/dashboard/topNav/TopNav";
import { useAuth } from "@/context/AuthProvider";

export default function CRMLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { tokenAccess } = useAuth();

  useEffect(() => {
    if (!tokenAccess) {
    }

    const checkAuth = async () => {
      try {
        await api.get("/auth/check-status");
      } catch (error) {}
    };

    checkAuth();
  }, [router, tokenAccess]);

  return (
    <div className="flex flex-col items-center min-h-screen overflow-hidden">
      <TopNav />

      <main className="pt-28 w-full min-h-0 bg-white flex-1">{children}</main>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import api from "@/infrastructure/lib/axios";
import { useRouter } from "next/navigation";

export default function Authlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        await api.get("/auth/check-status");
        router.replace("/crm/home");
      } catch (error) {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  return (
    <main
      className="min-h-screen max-h-screen bg-pblue flex items-center justify-center p-5 relative overflow-hidden"
      style={{
        backgroundImage: "url('/images/background/background.webp')",
      }}
    >
      {loading ? (
        /* Spinner mientras decidimos si lo echamos o lo dejamos entrar */
        <div className="w-10 h-10 rounded-full border-4 border-white/20 border-t-[#c8e600] animate-spin"></div>
      ) : (
        <div className="w-full sm:w-[600px] p-2 flex justify-center">
          {children}
        </div>
      )}
    </main>
  );
}

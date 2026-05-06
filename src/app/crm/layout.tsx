import { SessionGuard } from "@/components/auth/SessionGuard";
import { TopNav } from "@/components/dashboard/topNav/TopNav";
import { AuthProvider } from "@/context/AuthProvider";
import { auth } from "@/infrastructure/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function CRMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  return (
    <AuthProvider session={session}>
      <div className="flex flex-col items-center min-h-screen overflow-hidden">
        <SessionGuard />
        <TopNav />

        <main className="pt-28 w-full min-h-0 bg-white flex-1">{children}</main>
      </div>
    </AuthProvider>
  );
}

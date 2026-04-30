import { redirect } from "next/navigation";
import { auth } from "@/infrastructure/lib/auth";

export default async function Authlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user) {
    redirect("/crm/home");
  }

  return (
    <main
      className="min-h-screen max-h-screen bg-pblue flex items-center justify-center p-5 relative overflow-hidden"
      style={{
        backgroundImage: "url('/images/background/background.webp')",
      }}
    >
      {false ? (
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

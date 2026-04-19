import { TopNavPublic } from "@/components/public/TopNavPublic";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center min-h-screen overflow-hidden">
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/background/background.webp')",
        }}
      />
      <TopNavPublic />

      <main className="flex pt-20 w-full min-h-0 flex-1 justify-center">
        {children}
      </main>
    </div>
  );
}

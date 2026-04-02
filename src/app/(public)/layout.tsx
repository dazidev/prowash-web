import { TopNavPublic } from "@/components/public/TopNavPublic";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center min-h-screen overflow-hidden bg-pblue">
      <TopNavPublic />

      <main className="pt-20 w-full min-h-0  flex-1">{children}</main>
    </div>
  );
}

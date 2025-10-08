import { TopNav } from "@/components/dashboard/TopNav";

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center h-screen overflow-hidden">
      <TopNav/>

      <main className="pt-28 w-full bg-white flex-1">
        { children }
      </main>
    </div>

  );
}
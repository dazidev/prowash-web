import { TopNav } from "@/components/dashboard/topNav/TopNav";

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center min-h-screen overflow-hidden">
      <TopNav/>

      <main className="pt-28 w-full min-h-0 bg-white flex-1">
        { children }
      </main>
    </div>

  );
}
import { SideBar } from "@/components";

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <SideBar/>
      {children}
    </div>
  );
}
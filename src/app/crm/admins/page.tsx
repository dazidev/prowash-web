"use server";

import { getAdmins } from "@/actions";
import { Table } from "@/components/dashboard/table/Table";

export default async function UsersPage() {
  const admins = await getAdmins();
  const listHeaders = [
    "Administrator",
    "Email",
    "Role",
    "Status",
    "Last Connection",
    "Actions",
  ];
  return (
    <div className="flex flex-col min-h-[calc(100vh-8.25rem)] bg-gray-200 mx-5 rounded-2xl">
      <div className="m-8">
        <h1 className="text-4xl font-bold ml-5 mt-5">
          System administrator management
        </h1>
        <p className="text-2xl text-gray-700 mx-5 mb-10">
          In this section you can manage the administrators who have access to
          the system. Add, edit or delete user permissions.
        </p>
        <Table name={"Administrators"} headers={listHeaders} data={admins} />
      </div>
    </div>
  );
}

"use server";

import { IndividualServiceTable } from "@/components/dashboard/services/IndividualServiceTable";
import { PackagesTable } from "../../../../../components/dashboard/services/PackagesTable";
export default async function AppServicesPage() {
  const headers = ["Name", "Description", "Actions"];

  return (
    <div
      className="flex flex-row gap-4 mx-5 rounded-2xl bg-gray-200
                    min-h-[calc(100vh-8.25rem)] max-h-[calc(100vh-8.25rem)] p-4"
    >
      <div className="flex flex-1">
        <PackagesTable name={"Packages"} headers={headers} />
      </div>
      <div className="flex flex-1">
        <IndividualServiceTable
          name={"Individual Services"}
          headers={headers}
        />
      </div>
    </div>
  );
}

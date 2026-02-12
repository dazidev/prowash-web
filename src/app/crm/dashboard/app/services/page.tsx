"use server";

import { IndividualServiceTable } from "@/components/dashboard/services/IndividualServiceTable";
import { PackagesTable } from "../../../../../components/dashboard/services/PackagesTable";
import {
  getPackageRanges,
  getPackageServices,
} from "@/actions/services/packages.actions";
import { ServicesProvider } from "@/context/ServicesProvider";
import { PServiceItem, NextResponse, PackageRangeItem } from "@/infrastructure";

export default async function AppServicesPage() {
  const headers = ["Name", "Description", "Actions"];

  const services: NextResponse<PServiceItem[]> = await getPackageServices(); //! todo: making better.
  const ranges: NextResponse<PackageRangeItem[]> = await getPackageRanges();

  return (
    <div
      className="flex flex-row gap-4 mx-5 rounded-2xl bg-gray-200
                    min-h-[calc(100vh-8.25rem)] max-h-[calc(100vh-8.25rem)] p-4"
    >
      <ServicesProvider
        packageServicesData={services.data}
        packageRangesData={ranges.data}
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
      </ServicesProvider>
    </div>
  );
}

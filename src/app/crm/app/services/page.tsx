"use server";

import { IndividualServiceTable } from "@/components/dashboard/services/IndividualServiceTable";
import {
  getIndividualServices,
  getPackageRanges,
  getPackages,
  getPackageServices,
} from "@/actions/services/packages.actions";
import { ServicesProvider } from "@/context/ServicesProvider";
import { PackagesTable } from "@/components/dashboard/services/PackagesTable";

export default async function AppServicesPage() {
  const headersPackage = ["Name", "Actions"];
  const headersService = ["Name", "Initial Price", "Actions"];

  const services = await getPackageServices();
  const ranges = await getPackageRanges();
  const packages = await getPackages();
  const individualServices = await getIndividualServices();

  return (
    <div
      className="flex flex-row items-start gap-4 mx-5 rounded-2xl bg-gray-200
             min-h-[calc(100vh-8.25rem)] max-h-[calc(100vh-8.25rem)] p-4"
    >
      <ServicesProvider
        packageServicesData={services.data ?? []}
        packageRangesData={ranges.data ?? []}
        packageData={packages.data ?? []}
        individualServicesData={individualServices.data ?? []}
      >
        <div className="flex flex-1">
          <PackagesTable name={"Packages"} headers={headersPackage} />
        </div>
        <div className="flex flex-1">
          <IndividualServiceTable
            name={"Individual Services"}
            headers={headersService}
          />
        </div>
      </ServicesProvider>
    </div>
  );
}

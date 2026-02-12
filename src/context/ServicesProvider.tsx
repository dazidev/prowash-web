"use client";
import { getPackageRanges, getPackageServices } from "@/actions";
import { NextResponse, PackageRangeItem, PServiceItem } from "@/infrastructure";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type DataOptions = "package-services" | "package-ranges";

type ServicesContextValue = {
  packageServicesData: PServiceItem[];
  packageRangesData: PackageRangeItem[];
  revalidateData: (option: DataOptions) => void;
};

const ServicesContext = createContext<ServicesContextValue | null>(null);

interface Props {
  children: React.ReactNode;
  packageServicesData: PServiceItem[];
  packageRangesData: PackageRangeItem[];
}

export function ServicesProvider({
  children,
  packageServicesData,
  packageRangesData,
}: Props) {
  const [packageService, setPackageService] =
    useState<PServiceItem[]>(packageServicesData);
  const [packageRange, setPackageRange] =
    useState<PackageRangeItem[]>(packageRangesData);

  const revalidateData = useCallback(async (option: DataOptions) => {
    switch (option) {
      case "package-services":
        const servicesResponse: NextResponse<PServiceItem[]> =
          await getPackageServices();
        if (!servicesResponse.success) return;
        if (!servicesResponse.data) return;
        const dataServices: PServiceItem[] = servicesResponse.data?.map(
          (ps) => {
            return {
              id: ps.id,
              name: ps.name,
              createdAt: ps.createdAt,
              updatedAt: ps.updatedAt,
            };
          },
        );
        setPackageService(dataServices);
        break;

      case "package-ranges":
        const rangesResponse: NextResponse<PackageRangeItem[]> =
          await getPackageRanges();
        if (!rangesResponse.success) return;
        if (!rangesResponse.data) return;
        const dataRanges: PackageRangeItem[] = rangesResponse.data?.map(
          (pr) => {
            return {
              id: pr.id,
              description: pr.description,
              unit: pr.unit,
              createdAt: pr.createdAt,
              updatedAt: pr.updatedAt,
            };
          },
        );
        setPackageRange(dataRanges);
        break;

      default:
        break;
    }
  }, []);

  const value = useMemo<ServicesContextValue>(
    () => ({
      packageServicesData: packageService,
      packageRangesData: packageRange,
      revalidateData,
    }),
    [packageRange, packageService, revalidateData],
  );

  return (
    <ServicesContext.Provider value={value}>
      {children}
    </ServicesContext.Provider>
  );
}

export function useServices() {
  const context = useContext(ServicesContext);
  if (!context)
    throw new Error("useServices must be used inside ServicesProvider");
  return context;
}

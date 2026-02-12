"use client";
import { getPackageServices } from "@/actions";
import { NextResponse, PServiceItem } from "@/infrastructure";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type DataOptions = "package-services";

type ServicesContextValue = {
  packageServicesData: PServiceItem[];
  revalidateData: (option: DataOptions) => void;
};

const ServicesContext = createContext<ServicesContextValue | null>(null);

interface Props {
  children: React.ReactNode;
  packageServicesData: PServiceItem[];
}

export function ServicesProvider({ children, packageServicesData }: Props) {
  const [packageService, setPackageService] =
    useState<PServiceItem[]>(packageServicesData);

  const revalidateData = useCallback(async (option: DataOptions) => {
    switch (option) {
      case "package-services":
        const servicesResponse: NextResponse<PServiceItem[]> =
          await getPackageServices();
        if (!servicesResponse.success) return;
        if (!servicesResponse.data) return;
        const data: PServiceItem[] = servicesResponse.data?.map((ps) => {
          return {
            id: ps.id,
            name: ps.name,
            createdAt: ps.createdAt,
            updatedAt: ps.updatedAt,
          };
        });
        setPackageService(data);
        break;

      default:
        break;
    }
  }, []);

  const value = useMemo<ServicesContextValue>(
    () => ({
      packageServicesData: packageService,
      revalidateData,
    }),
    [packageService, revalidateData],
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

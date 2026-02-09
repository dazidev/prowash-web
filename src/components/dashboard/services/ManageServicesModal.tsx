"use client";

import { CloseButton } from "@/components/common/button/CloseButton";
import { PackageServicesTable } from "./PackageServicesTable";

interface Props {
  open: boolean;
  setOpen: (value: boolean, option: string) => void;
}

export const ManageServicesModal = ({ open, setOpen }: Props) => {
  if (!open) return null;
  return (
    <div
      id="crud-modal"
      tabIndex={-1}
      className="fixed z-50 md:inset-0 overflow-x-hidden flex justify-center items-center w-full h-[calc(100%)] max-h-full bg-gray-200/90"
    >
      <div className="relative w-full max-w-5xl max-h-full">
        <div className="relative overflow-y-auto h-[calc(100vh-5rem)] bg-gray-200 rounded-2xl shadow-2xl border border-gray-300">
          <div className="flex px-5 rounded-t-2xl p-5 bg-white border-b border-b-gray-200">
            <h3 className="flex-3 text-2xl font-semibold">Manage Services</h3>

            <CloseButton onClick={setOpen} element="services" />
          </div>
          <div className="flex p-5">
            <PackageServicesTable
              name="Package Services"
              headers={["Name", "Actions"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

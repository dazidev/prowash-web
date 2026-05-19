"use client";
import { useContext, useEffect, useState } from "react";
import { CloseButton } from "../../common/button/CloseButton";
import toast from "react-hot-toast";
import { TextInput } from "@/components/common/input/TextInput";
import { DefaultButton } from "@/components/common/button/DefaultButton";
import {
  createPackageRange,
  createPackageService,
  updatePackageRange,
  updatePackageService,
} from "@/actions";
import { NextResponse, PackageRangeItem, PServiceItem } from "@/infrastructure";
import { useServices } from "@/context/ServicesProvider";

type Elements = "service" | "range" | "updateService" | "updateRange";
type Options = "create" | "update";

interface Props {
  open: boolean;
  setOpen: (value: boolean, element: Elements) => void;
  name: Elements;
  option: Options;
  targetId?: string;
}

export const AddServiceRangeModal = ({
  open,
  setOpen,
  name,
  option,
  targetId,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState("");
  const { revalidateData, packageServicesData, packageRangesData } =
    useServices();

  useEffect(() => {
    if (option === "update") {
      if (name === "updateService") {
        const service = packageServicesData.find(
          (service) => service.id === targetId,
        );
        if (service) {
          setValue(service.name);
        }
      } else if (name === "updateRange") {
        const range = packageRangesData.find((range) => range.id === targetId);
        if (range) {
          setValue(range.description);
        }
      }
    }
  }, [targetId]);

  const formatName =
    option === "create"
      ? `${name.slice(0, 1).toUpperCase()}${name.slice(1)}`
      : `${name.slice(6)}`;

  const formatOption = option === "create" ? `Create` : `Update`;

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (option === "update") {
      if (!targetId) return;
      if (name === "updateService") {
        const response = await updatePackageService(targetId, value);
        if (!response.success) return toast.error(`${response.message}`);
        toast.success(`${response.message}`);
        revalidateData("package-services");
      } else if (name === "updateRange") {
        const response = await updatePackageRange(targetId, value);
        if (!response.success) return toast.error(`${response.message}`);
        toast.success(`${response.message}`);
        revalidateData("package-ranges");
      }
    } else if (option === "create") {
      if (name === "service") {
        const response = await createPackageService(value);
        if (!response.success) return toast.error(`${response.message}`);
        toast.success(`${response.message}`);
        revalidateData("package-services");
      } else if (name === "range") {
        const response = await createPackageRange(value);
        if (!response.success) return toast.error(`${response.message}`);
        toast.success(`${response.message}`);
        revalidateData("package-ranges");
      }
    }
    setLoading(false);
    setValue("");
  };

  if (!open) return null;
  return (
    <div
      id="crud-modal"
      tabIndex={-1}
      className="overflow-y-auto overflow-x-hidden fixed z-50 flex justify-center items-center w-full md:inset-0 h-screen max-h-full bg-gray-200/90"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-300">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-300">
            <h3 className="text-lg font-semibold">{`${formatOption} ${formatName}`}</h3>
            <CloseButton onClick={() => setOpen(false, name)} />
          </div>
          <form className="p-5" onSubmit={handleSubmit}>
            <div className="flex flex-col w-full justify-center items-center gap-5">
              <div className="flex w-full gap-3">
                <TextInput
                  name={formatName}
                  styles="w-full"
                  value={value}
                  valueOption={name}
                  onChange={setValue}
                />
              </div>

              <div className="flex items-end justify-end w-full">
                <div className="flex-1" />
                <DefaultButton
                  name={"Confirm"}
                  type="submit"
                  size="w-35"
                  loading={loading}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

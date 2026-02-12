"use client";
import { useState } from "react";
import { CloseButton } from "../../common/button/CloseButton";
import toast from "react-hot-toast";
import { TextInput } from "@/components/common/input/TextInput";
import { DefaultButton } from "@/components/common/button/DefaultButton";
import { createPackageService, updatePackageService } from "@/actions";
import { NextResponse, PServiceItem } from "@/infrastructure";
import { useServices } from "@/context/ServicesProvider";

type Elements = "service" | "range" | "updateService";
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
  const { revalidateData } = useServices();

  const formatName =
    option === "create"
      ? `${name.slice(0, 1).toUpperCase()}${name.slice(1)}`
      : `${name.slice(6)}`;

  const formatOption = option === "create" ? `Create` : `Update`;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (option === "update") {
      if (!targetId) return;
      const response: NextResponse<PServiceItem> = await updatePackageService(
        targetId,
        value,
      );
      if (!response.success) return toast.error(`${response.error?.message}`);
      toast.success(`${response.message}`);
    } else if (option === "create") {
      const response: NextResponse<PServiceItem> =
        await createPackageService(value);
      if (!response.success) return toast.error(`${response.error?.message}`);
      toast.success(`${response.message}`);
    }
    setLoading(false);
    revalidateData("package-services");
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

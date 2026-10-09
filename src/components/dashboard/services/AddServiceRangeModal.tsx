"use client";
import { useRef, useState } from "react";
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

interface ContentProps extends Props {
  initialValue: string;
}

export const AddServiceRangeModal = (props: Props) => {
  const { packageServicesData, packageRangesData } = useServices();

  if (!props.open) return null;

  const item =
    props.option === "update"
      ? props.name === "updateService"
        ? packageServicesData.find((service) => service.id === props.targetId)
        : packageRangesData.find((range) => range.id === props.targetId)
      : undefined;

  if (props.option === "update" && !item) return null;

  const initialValue = item
    ? "name" in item
      ? item.name
      : item.description
    : "";

  return (
    <AddServiceRangeModalContent
      key={`${props.option}:${props.name}:${props.targetId ?? "new"}:${item?.updatedAt ?? "new"}`}
      {...props}
      initialValue={initialValue}
    />
  );
};

const AddServiceRangeModalContent = ({
  open,
  setOpen,
  name,
  option,
  targetId,
  initialValue,
}: ContentProps) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(initialValue);
  const submittingRef = useRef(false);
  const { revalidateData } = useServices();

  const formatName =
    option === "create"
      ? `${name.slice(0, 1).toUpperCase()}${name.slice(1)}`
      : `${name.slice(6)}`;

  const formatOption = option === "create" ? `Create` : `Update`;

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (submittingRef.current) return;

    const submittedValue = value.trim();

    if (!submittedValue) {
      toast.error("Enter a value.");
      return;
    }

    submittingRef.current = true;
    setLoading(true);

    try {
      const isService = name === "service" || name === "updateService";
      let response;

      if (option === "update") {
        if (!targetId) {
          toast.error("Select the record you want to update.");
          return;
        }

        response = isService
          ? await updatePackageService(targetId, submittedValue)
          : await updatePackageRange(targetId, submittedValue);
      } else {
        response = isService
          ? await createPackageService(submittedValue)
          : await createPackageRange(submittedValue);
      }

      if (!response.success) {
        toast.error(response.message ?? "Unable to save the record.");
        return;
      }

      revalidateData(isService ? "package-services" : "package-ranges");

      toast.success(response.message ?? "Record saved successfully.");
      setValue("");
    } catch {
      toast.error("Unable to save the record. Please try again.");
    } finally {
      submittingRef.current = false;
      setLoading(false);
    }
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

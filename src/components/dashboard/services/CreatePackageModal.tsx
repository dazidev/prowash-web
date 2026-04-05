"use client";

import { CloseButton } from "@/components/common/button/CloseButton";
import { DefaultButton } from "@/components/common/button/DefaultButton";
import { TextInput } from "@/components/common/input/TextInput";
import { useServices } from "@/context/ServicesProvider";
import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  setOpen: (value: boolean, option: string) => void;
}

export const CreatePackageModal = ({ open, setOpen }: Props) => {
  const {
    packageServicesData: servicesData,
    packageRangesData: rangesData,
    setAmountService,
    setAmountRange,
    resetValues,
  } = useServices();
  const [name, setName] = useState("");

  useEffect(() => {
    resetValues();
    setName("");
  }, [open, resetValues]);

  const handleAmountService = (id: string, amount: string) => {
    if (!/^\d+$/.test(amount) && amount !== "") return;
    if (Number(amount) < 0) return;
    setAmountService(id, +amount);
  };

  const handlePriceRange = (id: string, price: string) => {
    if (!/^\d+$/.test(price) && price !== "") return;
    if (Number(price) < 0) return;
    setAmountRange(id, +price);
  };

  if (!open) return null;
  return (
    <div
      id="crud-modal"
      tabIndex={-1}
      className="fixed z-50 md:inset-0 overflow-x-hidden flex justify-center items-center w-full h-[calc(100%)] max-h-full bg-gray-200/90"
    >
      <div className="relative w-full max-w-4xl max-h-full">
        <div className="relative overflow-y-auto h-max-[calc(100vh-5rem)] bg-gray-200 rounded-2xl shadow-2xl border border-gray-300">
          <div className="flex px-5 rounded-t-2xl p-5 bg-white border-b border-b-gray-200">
            <h3 className="flex-3 text-2xl font-semibold">Create package</h3>

            <CloseButton onClick={setOpen} element="packages" />
          </div>
          <div className="flex p-5 border-b-1 border-gray-300">
            <TextInput
              name={"Service name"}
              value={name}
              valueOption={"service name"}
              onChange={setName}
              styles="w-100"
            />
          </div>
          <div className="flex flex-col p-5 w-full border-b-1 border-gray-300">
            <h1 className="text-2xl pb-4">Services includes</h1>
            <div className="grid grid-cols-3 gap-x-10 gap-y-4 w-full">
              {servicesData.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between w-full"
                >
                  <label id={s.id}>{s.name}</label>
                  <input
                    id={`${s.id}-input`}
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-15 p-2.5 "
                    value={s.amount === 0 ? "" : s.amount}
                    onChange={(e) => handleAmountService(s.id, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col p-5 border-b-1 border-gray-300">
            <h1 className="text-2xl pb-4">Range prices</h1>
            <div className="grid grid-cols-3 gap-x-10 gap-y-4 w-full">
              {rangesData.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between w-full gap-5"
                >
                  <label id={s.id}>{s.description}</label>
                  <input
                    id={`${s.id}-input`}
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    value={s.amount === 0 ? "" : s.amount}
                    onChange={(e) => handlePriceRange(s.id, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end w-full">
            <div className="flex w-52 p-5 justify-end">
              <DefaultButton name={"Create package"} loading={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

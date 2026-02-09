"use client";

import { DefaultButton } from "@/components/common/button/DefaultButton";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { ManageServicesModal } from "./ManageServicesModal";
import { AddPackageServiceModal } from "./AddPackageServiceModal";

interface Props {
  name: string;
  headers: string[];
  data?: string[];
}

export const PackageServicesTable = ({ name, headers, data }: Props) => {
  const [addService, setAddService] = useState(false);
  const [service, setService] = useState("");

  const handleModal = (value: boolean) => {
    setAddService(value);
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-sm sm:rounded-lg w-full border border-gray-200">
        <div className="flex flex-row w-full h-20 px-10 items-center justify-between bg-white border-b-2 border-gray-200">
          <span className="text-xl text-black font-bold">{`${name} List`}</span>
          <div className="flex flex-row gap-5">
            <DefaultButton
              name="Add Service"
              loading={false}
              style="bg-pgreen hover:brightness-110"
              onClick={() => setAddService(true)}
            />
          </div>
        </div>
        <div className="px-8 py-6 bg-white">
          <div className="relative">
            <BiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search by name"
              value={""}
              onChange={() => {}}
              className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 pt-5">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              {headers &&
                headers.map((header) => (
                  <th key={header} scope="col" className="px-6 py-3">
                    {header}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {/*dataList &&
              dataList.map((admin) => (
                <TableItem
                  key={admin.id}
                  user={admin}
                  setOpenConfirm={handleOpenModalConfirm}
                  setOpenEdit={handleOpenModalEdit}
                  setOpenChangePass={handleOpenModalChangePassword}
                  setTargetId={setTargetId}
                />
              ))*/}
          </tbody>
        </table>
      </div>
      <AddPackageServiceModal
        open={addService}
        setOpen={handleModal}
        brand={service}
        setBrand={setService}
      />
    </>
  );
};

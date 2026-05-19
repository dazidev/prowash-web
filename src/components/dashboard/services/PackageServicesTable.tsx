"use client";

import { DefaultButton } from "@/components/common/button/DefaultButton";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { AddServiceRangeModal } from "./AddServiceRangeModal";
import { PackageServicesItem } from "./PackageServicesItem";
import { PackageRangeItem, PServiceItem } from "@/infrastructure";
import { useServices } from "@/context/ServicesProvider";
import { ConfirmModal } from "../modal/ConfirmModal";
import { deletePackageRange, deletePackageService } from "@/actions";
import toast from "react-hot-toast";

type Elements = "service" | "range" | "updateService" | "updateRange";
type Views = "services" | "ranges";

interface Props {
  name: string;
  headers: string[];
}

export const PackageServicesTable = ({ name, headers }: Props) => {
  const [openModal, setOpenModal] = useState({
    service: false,
    updateService: false,
    range: false,
    updateRange: false,
    confirm: false,
  });
  const [targetId, setTargetId] = useState("");
  const [dataView, setDataView] = useState<Views>("services");
  const [dataList, setDataList] = useState<
    PServiceItem[] | PackageRangeItem[]
  >();

  const {
    packageServicesData: dataService,
    revalidateData,
    packageRangesData: dataRange,
  } = useServices();

  useEffect(() => {
    if (dataView === "services") {
      if (dataService) {
        setDataList(dataService);
      }
    } else if (dataView === "ranges") {
      if (dataRange) {
        setDataList(dataRange);
      }
    }
  }, [dataService, dataRange, dataView]);

  const handleModal = (value: boolean, element: Elements) => {
    setOpenModal((prev) => ({ ...prev, [element]: value }));
  };

  const handleOpenModalConfirm = (value: boolean) => {
    setOpenModal((prev) => ({ ...prev, ["confirm"]: value }));
  };

  const handleRemove = async () => {
    if (dataView === "services") {
      const response = await deletePackageService(targetId);

      if (!response.success) return toast.error(`${response.message}`);
      toast.success(`${response.message}`);
      revalidateData("package-services");
      return;
    } else if (dataView === "ranges") {
      const response = await deletePackageRange(targetId);

      if (!response.success) return toast.error(`${response.message}`);
      toast.success(`${response.message}`);
      revalidateData("package-ranges");
      return;
    }
  };

  const handleOpenModalUpdate = (value: boolean) => {
    if (dataView === "services") {
      setOpenModal((prev) => ({ ...prev, ["updateService"]: value }));
    } else if (dataView === "ranges") {
      setOpenModal((prev) => ({ ...prev, ["updateRange"]: value }));
    }
  };

  const handleDataView = () => {
    const option = dataView === "services" ? "ranges" : "services";
    setDataView(option);
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-sm sm:rounded-lg w-full border border-gray-200">
        <div className="flex flex-row w-full h-20 px-10 items-center justify-between bg-white border-b-2 border-gray-200">
          <span className="text-xl text-black font-bold">{`${name} List`}</span>
          <div className="flex flex-row gap-3">
            <DefaultButton
              name="Add Range"
              loading={false}
              onClick={() => handleModal(true, "range")}
            />
            <DefaultButton
              name="Add Service"
              loading={false}
              style="bg-pgreen hover:brightness-110"
              onClick={() => handleModal(true, "service")}
            />
          </div>
        </div>
        <div className="flex flex-row px-8 py-6 bg-white gap-5">
          <div className="flex-4 items-center relative">
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
          <button
            onClick={handleDataView}
            className="flex-1 w-100 h-auto bg-gray-200 hover:brightness-105 active:scale-98 rounded-xl"
          >
            {dataView.charAt(0).toUpperCase() + dataView.slice(1)}
          </button>
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
            {dataList &&
              dataList.map((service) => (
                <PackageServicesItem
                  key={service.id}
                  item={service}
                  setOpenConfirm={handleOpenModalConfirm}
                  setOpenUpdate={handleOpenModalUpdate}
                  setTargetId={setTargetId}
                />
              ))}
          </tbody>
        </table>
      </div>
      <AddServiceRangeModal
        open={openModal.service}
        name="service"
        setOpen={handleModal}
        option="create"
      />
      <AddServiceRangeModal
        open={openModal.updateService}
        name="updateService"
        setOpen={handleModal}
        option="update"
        targetId={targetId}
      />
      <AddServiceRangeModal
        open={openModal.range}
        name="range"
        setOpen={handleModal}
        option="create"
      />
      <AddServiceRangeModal
        open={openModal.updateRange}
        name="updateRange"
        setOpen={handleModal}
        option="update"
        targetId={targetId}
      />
      <ConfirmModal
        open={openModal.confirm}
        setOpen={handleOpenModalConfirm}
        handleRemove={handleRemove}
      />
    </>
  );
};

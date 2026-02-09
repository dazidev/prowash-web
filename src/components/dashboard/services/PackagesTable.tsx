"use client";

import { DefaultButton } from "@/components/common/button/DefaultButton";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { ManageServicesModal } from "./ManageServicesModal";

interface Props {
  name: string;
  headers: string[];
  data?: string[];
}

export const PackagesTable = ({ name, headers, data }: Props) => {
  const [service, setService] = useState(false);

  const handleModal = (value: boolean, option: string) => {
    switch (option) {
      case "services":
        setService(value);
        break;

      default:
        break;
    }
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-sm sm:rounded-lg w-full">
        <div className="flex flex-row w-full h-20 px-10 items-center justify-between bg-white border-b-2 border-gray-200">
          <span className="text-xl text-black font-bold">{`${name} List`}</span>
          <div className="flex flex-row gap-5">
            <DefaultButton
              name="Manage Services"
              loading={false}
              onClick={() => handleModal(true, "services")}
            />
            <DefaultButton
              name="Create package"
              loading={false}
              style="bg-pgreen hover:brightness-110"
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
        {/*<nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span className="font-semibold text-gray-900 dark:text-white">1-10</span> of <span className="font-semibold text-gray-900 dark:text-white">1000</span></span>
            <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
              <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
              </li>
              <li>
                <a href="#" aria-current="page" className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
              </li>
            </ul>
          </nav>*/}
      </div>
      <ManageServicesModal open={service} setOpen={handleModal} />
    </>
  );
};

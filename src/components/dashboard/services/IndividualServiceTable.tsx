"use client";

import { BiSearch } from "react-icons/bi";
import { CreateIndividualServiceModal } from "./modal/CreateIndividualServiceModal";
import { useState } from "react";
import { useServices } from "@/context/ServicesProvider";
import { ItemIndividualService } from "./item/ItemIndividualService";

interface Props {
  name: string;
  headers: string[];
  data?: string[];
}

export const IndividualServiceTable = ({ name, headers }: Props) => {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState({
    serviceId: "",
    initialPrice: "",
  });

  const { individualServicesData: dataList } = useServices();

  const openCreate = (value: boolean) => {
    setOpen(value);
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-sm sm:rounded-lg w-full">
        <div className="flex flex-row w-full h-20 items-center justify-between bg-white border-b-2 border-gray-200">
          <span className="text-xl text-black font-bold m-10">{`${name} List`}</span>
          <button
            className="block bg-[#0841D9] mr-10 px-5 py-2 text-white font-bold rounded-lg cursor-pointer hover:brightness-110 focus:ring-2 focus:ring-blue-300"
            type="button"
            onClick={() => openCreate(true)}
          >
            {`+ Add `}
          </button>
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
            {dataList &&
              dataList.map((service) => (
                <ItemIndividualService
                  key={service.id}
                  id={service.id}
                  initialPrice={service.initialPrice}
                  name={service.service.name}
                />
              ))}
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
      <CreateIndividualServiceModal
        open={open}
        setOpen={openCreate}
        service={service}
        setService={setService}
      />
    </>
  );
};

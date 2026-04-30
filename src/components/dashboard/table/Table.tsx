"use client";

import { User } from "@/interfaces";
import { TableItem } from "./TableItem";
import { BiSearch } from "react-icons/bi";
import { useEffect, useState } from "react";
import { FormModal } from "../modal/FormModal";
import { ConfirmModal } from "../modal/ConfirmModal";
import {
  createAdmin,
  deleteAdmin,
  editAdmin,
} from "@/actions/admins/admins.actions";
import toast from "react-hot-toast";
import { ChangePasswordModal } from "../modal/ChangePasswordModal";
import { AdminForm } from "@/infrastructure";

interface Props {
  name: string;
  headers: string[];
  data?: User[];
}

export const Table = ({ name, headers, data }: Props) => {
  const [search, setSearch] = useState("");
  const [dataList, setDataList] = useState<User[]>();
  const [openModal, setOpenModal] = useState({
    create: false,
    confirm: false,
    edit: false,
    changePassword: false,
  });
  const [targetId, setTargetId] = useState("");

  useEffect(() => {
    if (data) {
      setDataList(data);
    }
  }, [data]);

  const findData = (value: string) => {
    if (!data) return;

    const q = value.toLowerCase();

    const dataFounds = data.filter((row) => {
      const fullname = `${row.name.toLowerCase()} ${row.lastname.toLowerCase()}`;
      const email = row.email.toLowerCase();

      return fullname.includes(q) || email.includes(q);
    });
    if (dataFounds) {
      setDataList(dataFounds);
    }
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    findData(value);
  };

  const handleOpenModalCreate = (value: boolean) => {
    setOpenModal((prev) => ({ ...prev, create: value }));
  };

  const handleOpenModalConfirm = (value: boolean) => {
    setOpenModal((prev) => ({ ...prev, confirm: value }));
  };

  const handleOpenModalEdit = (value: boolean) => {
    setOpenModal((prev) => ({ ...prev, edit: value }));
  };

  const handleOpenModalChangePassword = (value: boolean) => {
    setOpenModal((prev) => ({ ...prev, changePassword: value }));
  };

  const handleRemove = async () => {
    try {
      const remove = await deleteAdmin(targetId);

      if (!remove.success) return toast.error(`${remove.error.code}`);

      return toast.success("The administrator has been delete successfully");
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      setTargetId("");
    }
  };

  const handleCreate = async (field: AdminForm): Promise<boolean> => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.email)) return false;
    if (!field.password) return false;
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        field.password,
      )
    )
      return false;
    if (
      !field.name ||
      !field.lastname ||
      !field.email ||
      !field.password ||
      !field.roles
    )
      return false;
    try {
      const response = await createAdmin(field);
      if (!response.success) {
        toast.error(`${response.error.code}`);
        return false;
      }

      toast.success("The administrator has been created successfully");
      return true;
    } catch (error) {
      toast.error(`${error}`);
      return false;
    }
  };

  const handleEdit = async (field: AdminForm): Promise<boolean> => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.email)) return false;
    if (!field.name || !field.lastname || !field.email || !field.roles)
      return false;

    try {
      const response = await editAdmin(targetId, field);
      if (!response.success) {
        toast.error(`${response.error.code}`);
        return false;
      }

      toast.success("The administrator has been edit successfully");
      return true;
    } catch (error) {
      toast.error(`${error}`);
      return false;
    }
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-sm sm:rounded-lg m-5">
        <div className="flex flex-row w-full h-20 items-center justify-between bg-white border-b-2 border-gray-200">
          <span className="text-xl text-black font-bold m-10">{`${name} List`}</span>
          <button
            className="block bg-[#0841D9] mr-10 px-5 py-2 text-white font-bold rounded-lg cursor-pointer hover:brightness-110 focus:ring-2 focus:ring-blue-300"
            type="button"
            onClick={() => handleOpenModalCreate(true)}
          >
            {`+ Add ${name.slice(0, -1)}`}
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
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
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
              dataList.map((admin) => (
                <TableItem
                  key={admin.id}
                  user={admin}
                  setOpenConfirm={handleOpenModalConfirm}
                  setOpenEdit={handleOpenModalEdit}
                  setOpenChangePass={handleOpenModalChangePassword}
                  setTargetId={setTargetId}
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
      <FormModal
        open={openModal.create}
        setOpen={handleOpenModalCreate}
        handleAction={handleCreate}
        type="create"
      />
      <FormModal
        open={openModal.edit}
        setOpen={handleOpenModalEdit}
        handleAction={handleEdit}
        type="edit"
        user={data?.find((user) => {
          return user.id === targetId;
        })}
      />
      <ConfirmModal
        open={openModal.confirm}
        setOpen={handleOpenModalConfirm}
        handleRemove={handleRemove}
      />
      <ChangePasswordModal
        id={targetId}
        open={openModal.changePassword}
        setOpen={handleOpenModalChangePassword}
      />
    </>
  );
};

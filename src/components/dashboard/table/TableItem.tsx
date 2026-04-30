"use client";

import { User } from "@/interfaces";
import React from "react";

interface Props {
  user: User;
  setOpenConfirm: (value: boolean) => void;
  setOpenEdit: (value: boolean) => void;
  setOpenChangePass: (value: boolean) => void;
  setTargetId: React.Dispatch<React.SetStateAction<string>>;
}

export const TableItem = ({
  user,
  setOpenConfirm,
  setOpenEdit,
  setOpenChangePass,
  setTargetId,
}: Props) => {
  const { id, name, lastname, email, roles, lastLogin } = user;

  const initialNameLetters = `${name.slice(0, 1).toUpperCase()}${lastname
    .slice(0, 1)
    .toUpperCase()}`;
  const fullName = `${name} ${lastname}`;
  const formatRole = roles[0];

  const handleClickDelete = () => {
    setOpenConfirm(true);
    setTargetId(id);
  };

  const handleClickEdit = () => {
    setOpenEdit(true);
    setTargetId(id);
  };

  const handleClickChangePass = () => {
    setOpenChangePass(true);
    setTargetId(id);
  };

  return (
    <tr className="bg-white border-b  border-gray-200 hover:bg-gray-50">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
            {initialNameLetters}
          </div>
          <span className="font-semibold text-slate-900">{fullName}</span>
        </div>
      </th>
      <td className="px-6 py-4">
        <span className="text-black"> {email} </span>
      </td>
      <td className="px-6 py-4">
        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
          {formatRole}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
          Active
        </span>
      </td>
      <td className="px-6 py-4">{lastLogin}</td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <button
            className="w-8 h-8 rounded-md border border-slate-200 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 text-slate-500 flex items-center justify-center transition-all"
            onClick={handleClickEdit}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M11.5 2.5l2 2L6 12H4v-2L11.5 2.5z" />
            </svg>
          </button>

          <button
            className="w-8 h-8 rounded-md border border-slate-200 hover:border-yellow-500 hover:bg-blue-50 hover:text-yellow-500 text-slate-500 flex items-center justify-center transition-all"
            onClick={handleClickChangePass}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="7" width="10" height="7" rx="1" />
              <path d="M5 7V5a3 3 0 016 0v2" />
            </svg>
          </button>

          <button
            className="w-8 h-8 rounded-md border border-slate-200 hover:border-red-500 hover:bg-red-50 hover:text-red-600 text-slate-500 flex items-center justify-center transition-all"
            onClick={handleClickDelete}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M2 4h12M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1M13 4v9a1 1 0 01-1 1H4a1 1 0 01-1-1V4" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
};

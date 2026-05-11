"use client";

import { hasProperty } from "@/infrastructure";
import { Contact, User } from "@/interfaces";
import { ItemAdmin } from "./items/ItemAdmin";
import { ItemContact } from "./items/ItemContact";

interface Props {
  value: User | Contact;
  setOpenConfirm: (value: boolean) => void;
  setOpenEdit: (value: boolean) => void;
  setOpenChangePass: (value: boolean) => void;
  setOpenViewContact: (value: boolean) => void;
  setTargetId: React.Dispatch<React.SetStateAction<string>>;
}

export const TableItem = ({
  value,
  setOpenConfirm,
  setOpenEdit,
  setOpenChangePass,
  setOpenViewContact,
  setTargetId,
}: Props) => {
  const { id } = value;

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

  const handleViewContact = () => {
    setOpenViewContact(true);
    setTargetId(id);
  };

  return (
    <tr className="bg-white border-b  border-gray-200 hover:bg-gray-50">
      {hasProperty(value, "roles") && <ItemAdmin admin={value} />}
      {hasProperty(value, "comments") && <ItemContact contact={value} />}

      {hasProperty(value, "roles") && (
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
      )}

      {hasProperty(value, "comments") && (
        <td className="px-6 py-4">
          <div className="flex items-center gap-2">
            <button
              className="w-8 h-8 rounded-md border border-slate-200 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 text-slate-500 flex items-center justify-center transition-all"
              onClick={handleViewContact}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1.5 8s2.5-4 6.5-4 6.5 4 6.5 4-2.5 4-6.5 4-6.5-4-6.5-4z" />
                <circle cx="8" cy="8" r="2" />
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
      )}
    </tr>
  );
};

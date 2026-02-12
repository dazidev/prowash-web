"use client";

import { PackageRangeItem, PServiceItem } from "@/infrastructure";
import React from "react";

type Service = {
  name: string;
};

type Range = {
  description: string;
};

interface Props {
  item: PServiceItem | PackageRangeItem;
  setOpenConfirm: (value: boolean) => void;
  setOpenUpdate: (value: boolean) => void;
  setTargetId: React.Dispatch<React.SetStateAction<string>>;
}

export const PackageServicesItem = ({
  item,
  setOpenConfirm,
  setOpenUpdate,
  setTargetId,
}: Props) => {
  const isService = (value: unknown): value is Service => {
    return (
      typeof value === "object" &&
      value !== null &&
      "name" in value &&
      typeof (value as any).name === "string"
    );
  };

  const isRange = (value: unknown): value is Range => {
    return (
      typeof value === "object" &&
      value !== null &&
      "description" in value &&
      typeof (value as any).description === "string"
    );
  };

  const getName = (item: PServiceItem | PackageRangeItem) => {
    if (isService(item)) {
      return item.name;
    } else if (isRange(item)) {
      return item.description;
    }
  };

  const name = getName(item);

  const handleClickDelete = () => {
    setOpenConfirm(true);
    setTargetId(item.id);
  };

  const handleClickUpdate = () => {
    setOpenUpdate(true);
    setTargetId(item.id);
  };

  return (
    <tr className="bg-white border-b  border-gray-200 hover:bg-gray-50">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
      >
        <div className="flex items-center gap-3">
          <span className="font-semibold text-slate-900">{name}</span>
        </div>
      </th>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <button
            className="w-8 h-8 rounded-md border border-slate-200 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 text-slate-500 flex items-center justify-center transition-all"
            onClick={handleClickUpdate}
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

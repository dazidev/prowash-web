"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface Props {
  path: string;
  labelText: string;
}

export const TopNavItem = ({ path, labelText }: Props) => {
  const currentPath = usePathname();
  const [openMenu, setOpenMenu] = useState({
    app: false,
  });

  return (
    <li className="">
      <Link
        href={path}
        className={"flex items-center h-14  rounded-lg"}
        onMouseEnter={() => {
          setOpenMenu((prev) => ({ ...prev, app: true }));
        }}
        onMouseLeave={() => {
          setOpenMenu((prev) => ({ ...prev, app: false }));
        }}
      >
        <div className="flex flex-col items-center pr-10">
          <span
            className={`text-2xl
            ${
              currentPath.startsWith(path)
                ? "text-blue-600 font-bold"
                : "text-gray-500 hover:text-blue-600"
            }
            `}
          >
            {labelText}
          </span>
        </div>
        {labelText === "App" && openMenu.app === true && (
          <div className="absolute top-15 flex flex-col w-auto h-auto bg-gray-100 py-2 px-3 gap-2 rounded-xl">
            <Link href={"/crm/app/advertising"}>
              <span
                className={`${
                  path === currentPath
                    ? "text-blue-600 font-bold"
                    : "text-gray-500 hover:text-blue-600"
                }`}
              >
                Advertising
              </span>
            </Link>
            <Link href={"/crm/app/services"}>
              <span
                className={`${
                  path === currentPath
                    ? "text-blue-600 font-bold"
                    : "text-gray-500 hover:text-blue-600"
                }`}
              >
                Services
              </span>
            </Link>
          </div>
        )}
      </Link>
    </li>
  );
};

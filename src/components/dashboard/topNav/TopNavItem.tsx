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
    <li
      className="relative"
      onMouseEnter={() => setOpenMenu((prev) => ({ ...prev, app: true }))}
      onMouseLeave={() => setOpenMenu((prev) => ({ ...prev, app: false }))}
    >
      <Link href={path} className="flex items-center h-14 rounded-lg">
        <div className="flex flex-col items-center pr-10">
          <span
            className={`text-2xl ${
              currentPath.startsWith(path)
                ? "text-blue-600 font-bold"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            {labelText}
          </span>
        </div>
      </Link>

      {labelText === "App" && openMenu.app && (
        <div className="absolute top-14 flex flex-col w-48 bg-white shadow-lg py-2 px-3 gap-2 rounded-xl border border-gray-100 z-50">
          <Link href="/crm/app/advertising">
            <span
              className={`block p-2 rounded-md ${
                currentPath === "/crm/app/advertising"
                  ? "text-blue-600 font-bold bg-blue-50"
                  : "text-gray-500 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              Advertising
            </span>
          </Link>

          <Link href="/crm/app/services">
            <span
              className={`block p-2 rounded-md ${
                currentPath === "/crm/app/services"
                  ? "text-blue-600 font-bold bg-blue-50"
                  : "text-gray-500 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              Services
            </span>
          </Link>
        </div>
      )}
      {labelText === "Clients" && openMenu.app && (
        <div className="absolute top-14 flex flex-col w-48 bg-white shadow-lg py-2 px-3 gap-2 rounded-xl border border-gray-100 z-50">
          <Link href="/crm/clients/quotes">
            <span
              className={`block p-2 rounded-md ${
                currentPath === "/crm/clients/quotes"
                  ? "text-blue-600 font-bold bg-blue-50"
                  : "text-gray-500 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              Quotes
            </span>
          </Link>

          {/*<Link href="/crm/app/services">
            <span
              className={`block p-2 rounded-md ${
                currentPath === "/crm/app/services"
                  ? "text-blue-600 font-bold bg-blue-50"
                  : "text-gray-500 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              Services
            </span>
          </Link>*/}
        </div>
      )}
    </li>
  );
};

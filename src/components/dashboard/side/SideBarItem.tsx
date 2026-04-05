"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IconType } from "react-icons";
import { BsCoin, BsHouseFill, BsNut, BsPeopleFill } from "react-icons/bs";

const ICONS = {
  users: BsPeopleFill,
  clients: BsCoin,
  home: BsHouseFill,
  settings: BsNut,
} satisfies Record<string, IconType>;

type IconKey = keyof typeof ICONS;

interface Props {
  path: string;
  labelText: string;
  icon: IconKey;
}

export const SideBarItem = ({ path, labelText, icon }: Props) => {
  const currentPath = usePathname();
  const Icon = ICONS[icon];

  return (
    <li>
      <Link
        href={path}
        className={`
          flex items-center h-14  rounded-lg 
          ${
            currentPath === path
              ? " text-black"
              : "text-gray-500 hover:text-blue-900"
          }
        `}
      >
        {currentPath === path && (
          <div className="w-2 h-full rounded-r-lg bg-blue-900" />
        )}

        <div className="flex items-center pl-8">
          <Icon
            size={40}
            className={`
              w-5 h-5 transition duration-75
              ${currentPath === path ? "text-blue-900" : ""}
            `}
          />
          <span className={"ms-3 text-xl"}>{labelText}</span>
        </div>
      </Link>
    </li>
  );
};

/*import Link from "next/link"
import { usePathname } from "next/navigation"
import { IconType } from "react-icons"
import { BsCoin, BsHouse, BsNut, BsPeople } from "react-icons/bs";

const ICONS = {
  users: BsPeople,
  clients: BsCoin,
  home: BsHouse,
  settings: BsNut
} satisfies Record<string, IconType>;

type IconKey = keyof typeof ICONS;

interface Props {
  path: string
  label: string
  icon: IconKey
}

export const SideBarItem = ({ path, label, icon }: Props) => {
  const currentPath = usePathname()
  const Icon = ICONS[icon];
  return (
    <li 
    className= {`
      h-14 flex items-center rounded-2xl
      ${ currentPath === path ? 'bg-gray-200': '' } 
    `} 
    >
      <Link 
        href={path} 
        className={`
          px-4 py-10 flex items-center space-x-4 rounded-md group
          ${ currentPath === path ? 'text-black' : 'text-gray-300'}
        `}
      >
        <Icon size={30} className={`${ currentPath === path ? '' : 'group-hover:text-white'}`}/>
        <span 
          className={`
            text-lg
            ${ currentPath === path ? '' : 'group-hover:text-white'}
          `}
        >{label}</span>
      </Link>
    </li>
  )
}*/

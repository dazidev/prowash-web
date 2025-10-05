'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { IconType } from "react-icons"
import { BsHouse, BsNut, BsPeople } from "react-icons/bs";

const ICONS = {
  users: BsPeople,
  clients: BsNut,
  home: BsHouse
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
}

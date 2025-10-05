import { BsPeople, BsNut } from "react-icons/bs"
import { SideBarItem } from "./SideBarItem"


export const SideBar = () => {
  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-start h-screen bg-blue-950 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <span className="color text-3xl font-bold pt-10 text-white">PROWASH CRM</span>

      <ul className="space-y-2.5 tracking-wide mt-8">
        <SideBarItem 
          path="/crm/dashboard" 
          label="Home"
          icon={'home'}
        />

        <SideBarItem 
          path="/crm/dashboard/users" 
          label="Users"
          icon={'users'}
        />

        <SideBarItem
          path="/crm/dashboard/clients"
          label="Clients"
          icon={'clients'}
        />
      </ul>

    </aside>
  )
}

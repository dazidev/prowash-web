import { SideBarItem } from "./SideBarItem";

// <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>
// <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>

export const SideBar = () => {
  return (
    <aside
      id="logo-sidebar"
      className="fixed inset-y-4 left-4 z-40 w-[15%] pt-10 rounded-xl overflow-hidden transition-transform -translate-x-full bg-gray-200 sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full pt-20 pb-4 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          <SideBarItem path="/crm/dashboard" labelText="Home" icon="home" />
          <SideBarItem
            path="/crm/dashboard/users"
            labelText="Users"
            icon="users"
          />
          <SideBarItem
            path="/crm/dashboard/clients"
            labelText="Clients"
            icon="clients"
          />
        </ul>
      </div>
    </aside>
  );
};

/*export const SideBar = () => {
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
}*/

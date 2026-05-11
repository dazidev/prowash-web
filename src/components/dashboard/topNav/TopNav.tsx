import { TopNavItem } from "./TopNavItem";
import { UserOptions } from "./UserOptions";

export const TopNav = () => {
  return (
    <nav className="fixed top-0 z-50 w-[95%] h-20 m-4 rounded-xl">
      <div className="flex flex-row px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center h-14 justify-end pl-5">
          <span className="text-4xl font-extrabold text-pblue">ProWash</span>
          <span className="text-4xl font-extrabold text-pgreen ml-2">365</span>
        </div>

        <div className="flex-1">
          <ul className="flex flex-row justify-center">
            <TopNavItem path="/crm/home" labelText="Home" />
            <TopNavItem path="/crm/admins" labelText="Admins" />
            <TopNavItem path="/crm/clients" labelText="Clients" />
            <TopNavItem path="/crm/app" labelText="App" />
            <TopNavItem path="/crm/contacts" labelText="Contacts" />
          </ul>
        </div>

        <div className="">
          <UserOptions
            name={"Daniel"}
            lastname={"Zipa"}
            email={"danielzipa@outlook.com"}
            role={"Admin"}
          />
        </div>
      </div>
    </nav>
  );
};

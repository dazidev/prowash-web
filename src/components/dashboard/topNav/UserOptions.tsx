"use client";

// import { logout } from "@/src/actions";
import { useRef, useState } from "react";
import { useClickOutside } from "@/infrastructure/hooks/useClickOutside";
import { logoutUser } from "@/actions/auth/logout.action";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";

interface Props {
  name: string;
  lastname: string;
  email: string;
  role: string;
}

export const UserOptions = ({ name, lastname, email, role }: Props) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const shortName = `${name?.slice(0, 1)}${lastname?.slice(0, 1)}`;
  const router = useRouter();
  const { setTokenAccess } = useAuth();

  useClickOutside(menuRef, () => setOpen(false), [btnRef]);

  const logout = async () => {
    //! HANDLE THE RESPONSE
    const res = await logoutUser();
    setTokenAccess(null);

    router.push("/auth/login");
  };

  return (
    <>
      <div className="flex items-center gap-3">
        <div className="flex flex-col text-right">
          <div className="text-lg font-semibold text-black">Hi, {name}</div>
          <div className="text-sm text-neutral-950">{email}</div>
        </div>
        <button
          ref={btnRef}
          className="w-10 h-10 rounded-full bg-linear-to-br from-pblue to-pgreen flex items-center justify-center text-black font-semibold cursor-pointer"
          onClick={() => setOpen((v) => !v)}
        >
          {shortName}
        </button>
      </div>
      {open && (
        <div
          ref={menuRef}
          className="flex flex-col bg-white rounded-xl mt-2 border border-stone-700"
        >
          <div className="flex flex-col p-3 border-b border-stone-700">
            <span className="font-semibold">{`${name} ${lastname}`}</span>
            <span>{role}</span>
          </div>
          <div className="py-1  hover:text-red-700 rounded-b-xl">
            <button
              className="flex w-full  py-2 cursor-pointer"
              onClick={() => {
                setOpen(false);
                logout();
              }}
            >
              <span className="px-3">Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

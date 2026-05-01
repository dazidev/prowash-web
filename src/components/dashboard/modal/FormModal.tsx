"use client";

import { AdminForm } from "@/infrastructure";
import { User } from "@/interfaces";
import React, { useEffect, useState } from "react";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  handleAction: (field: AdminForm) => Promise<boolean>;
  type: "create" | "edit";
  user?: User;
}

export const FormModal = ({
  open,
  setOpen,
  handleAction,
  type,
  user,
}: Props) => {
  const [field, setField] = useState<AdminForm>({
    name: "",
    lastname: "",
    email: "",
    password: "",
    roles: "",
  });

  useEffect(() => {
    if (user) {
      setField({
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        password: "",
        roles: user.roles,
      });
    }
  }, [user]);

  const handleChange = (value: string, nameField: string) => {
    setField((prev) => ({ ...prev, [nameField]: value }));
  };

  const clearFields = () => {
    setField(() => ({
      name: "",
      lastname: "",
      email: "",
      password: "",
      roles: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await handleAction(field);
    if (!response) return;
    clearFields();
    setOpen(false);
  };

  return (
    <>
      {open && (
        <div
          id="crud-modal"
          tabIndex={-1}
          className="overflow-y-auto overflow-x-hidden fixed z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  {`${
                    type.charAt(0).toUpperCase() + type.slice(1)
                  } Administrator`}
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                  onClick={() => setOpen(false)}
                >
                  <svg
                    className="w-3 h-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      placeholder="Enter Name"
                      required
                      value={field.name}
                      onChange={(e) => {
                        handleChange(e.target.value, "name");
                      }}
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="lastname"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Lastname
                    </label>
                    <input
                      type="text"
                      name="lastname"
                      id="lastname"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      placeholder="Enter Lastname"
                      required
                      value={field.lastname}
                      onChange={(e) => {
                        handleChange(e.target.value, "lastname");
                      }}
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      placeholder="Enter Email"
                      required
                      value={field.email}
                      onChange={(e) => {
                        handleChange(e.target.value, "email");
                      }}
                    />
                  </div>

                  {type === "create" && (
                    <div className="col-span-2">
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                        placeholder="Enter Password"
                        required
                        value={field.password}
                        onChange={(e) => {
                          handleChange(e.target.value, "password");
                        }}
                      />
                    </div>
                  )}
                  <div className="col-span-2">
                    <label
                      htmlFor="role"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Role
                    </label>
                    <select
                      id="role"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                      value={field.roles}
                      onChange={(e) => handleChange(e.target.value, "role")}
                    >
                      <option value="">Select role</option>
                      <option value="GENERAL_ADMIN">General Admin</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end mt-10">
                  <button
                    type="submit"
                    className="text-white inline-flex items-end bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    <svg
                      className="me-1 -ms-1 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    {`${
                      type.charAt(0).toUpperCase() + type.slice(1)
                    } Administrator`}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

"use client";

import { changeContactStatus } from "@/actions";
import { Contact } from "@/interfaces";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  handleAction: () => Promise<boolean>;
  value: Contact;
}

export const ContactViewModal = ({
  open,
  setOpen,
  handleAction,
  value,
}: Props) => {
  const [field, setField] = useState<Contact>({
    id: value.id,
    name: value.name,
    lastname: value.lastname,
    email: value.email,
    phone: value.phone,
    status: value.status,
    zipcode: value.zipcode,
    comments: value.comments,
    createdAt: value.createdAt,
    updatedAt: value.updatedAt,
  });
  const router = useRouter();

  useEffect(() => {
    if (value) {
      setField({
        id: value.id,
        name: value.name,
        lastname: value.lastname,
        email: value.email,
        phone: value.phone,
        status: value.status,
        zipcode: value.zipcode,
        comments: value.comments,
        createdAt: value.createdAt,
        updatedAt: value.updatedAt,
      });
    }
  }, [value]);

  const handleChange = (value: string, nameField: string) => {
    setField((prev) => ({ ...prev, [nameField]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await handleAction();
    if (!response) return;
    setOpen(false);
  };

  const handleAttend = async () => {
    const res = await changeContactStatus(field.id);

    if (!res.success) {
      toast.error(res.message!);
      return;
    }

    router.refresh();
    toast.success(res.message!);
    setOpen(false);
    return;
  };

  return (
    <>
      {open && (
        <div
          id="crud-modal"
          tabIndex={-1}
          className="overflow-y-auto overflow-x-hidden fixed z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black/50"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm">
              <div className="flex items-start justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                <div className="flex flex-col w-auto gap-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    CONTACT INFORMATION
                  </h3>
                  <span
                    className={`self-start h-auto px-2 rounded-lg ${field.status === "ATTENDED" ? "bg-green-300 text-green-900" : "bg-red-300 text-red-900"}`}
                  >
                    {field.status.replace("_", " ")}
                  </span>
                  <span
                    className={`self-start h-auto px-2 rounded-lg bg-yellow-300 text-yellow-900`}
                  >
                    {field.status === "ATTENDED"
                      ? field.updatedAt.toString().slice(0, 10)
                      : field.createdAt.toString().slice(0, 10)}
                  </span>
                </div>
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
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <div className="flex-1">
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                        placeholder="Name"
                        readOnly
                        value={field.name}
                      />
                    </div>
                    <div className="flex-1">
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                        placeholder="Lastname"
                        readOnly
                        value={field.lastname ?? ""}
                      />
                    </div>
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                      placeholder="Email"
                      readOnly
                      value={field.email}
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label
                        htmlFor="phone"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Phone
                      </label>
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                        placeholder="Phone"
                        readOnly
                        value={field.phone}
                      />
                    </div>
                    <div className="flex-1">
                      <label
                        htmlFor="zipcode"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Zipcode
                      </label>
                      <input
                        type="text"
                        name="zipcode"
                        id="zipcode"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                        placeholder="Zipcode"
                        readOnly
                        value={field.zipcode ?? ""}
                      />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="comments"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Comments
                    </label>
                    <textarea
                      name="comments"
                      id="comments"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                      placeholder="Phone"
                      readOnly
                      value={field.comments}
                    />
                  </div>
                </div>
                {field.status === "NOT_ATTENDED" && (
                  <div className="flex justify-end mt-10">
                    <button
                      type="button"
                      onClick={handleAttend}
                      className="text-white inline-flex items-end bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Attend
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

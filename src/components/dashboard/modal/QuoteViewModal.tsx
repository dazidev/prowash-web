"use client";

import { changeContactStatus } from "@/actions";
import { Contact, PackageOrderQuote } from "@/interfaces";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  handleAction: () => Promise<boolean>;
  value: PackageOrderQuote;
}

export const QuoteViewModal = ({
  open,
  setOpen,
  handleAction,
  value,
}: Props) => {
  const [field, setField] = useState<PackageOrderQuote>(value);

  useEffect(() => {
    if (value) {
      setField(value);
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

  /*const handleAttend = async () => {
    const res = await changeContactStatus(field.id);

    if (!res.success) {
      toast.error(res.message!);
      return;
    }

    router.refresh();
    toast.success(res.message!);
    setOpen(false);
    return;
  };*/

  return (
    <>
      {open && (
        <div
          id="crud-modal"
          tabIndex={-1}
          className="overflow-y-auto overflow-x-hidden fixed z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black/50"
        >
          <div className="relative p-4 w-full max-w-4xl max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm">
              <div className="flex items-start justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                <div className="flex flex-col w-auto gap-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    QUOTE INFORMATION
                  </h3>
                  <span
                    className={`self-start h-auto px-2 rounded-lg ${field.purchaseStatus === "PENDING_REVIEW" ? "bg-red-300 text-red-900" : "bg-green-300 text-green-900"}`}
                  >
                    {field.purchaseStatus.replace("_", " ")}
                  </span>
                  <span
                    className={`self-start h-auto px-2 rounded-lg bg-yellow-300 text-yellow-900`}
                  >
                    {field.purchaseStatus === "PENDING_REVIEW"
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
                <h1 className="font-bold">User Information:</h1>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2 pb-5">
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
                        value={field.user.name}
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
                        value={field.user.lastname}
                      />
                    </div>
                    <div className="flex-2">
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
                        value={field.user.email}
                      />
                    </div>
                    <div className="flex-1">
                      <label
                        htmlFor="phone-number"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Phone
                      </label>
                      <input
                        type="number"
                        name="Phone"
                        id="phone-number"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                        placeholder="Phone number"
                        readOnly
                        value={`${field.user.phoneNumber}`}
                      />
                    </div>
                  </div>
                </div>
                <h1 className="font-bold">House Information:</h1>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2  pb-5">
                    <div className="flex-1">
                      <label
                        htmlFor="house-name"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="house-name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                        placeholder="Name"
                        readOnly
                        value={field.userHouse.name}
                      />
                    </div>
                    <div className="flex-2">
                      <label
                        htmlFor="street"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Street
                      </label>
                      <input
                        type="text"
                        name="street"
                        id="street"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                        placeholder="Street"
                        readOnly
                        value={field.userHouse.street}
                      />
                    </div>
                    <div className="flex-2">
                      <label
                        htmlFor="complementStreet"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Complement Street
                      </label>
                      <input
                        type="text"
                        name="Complement Street"
                        id="complementStreet"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                        placeholder="Complement Street"
                        readOnly
                        value={`${field.userHouse.complementStreet}`}
                      />
                    </div>
                    <div className="flex-1">
                      <label
                        htmlFor="city"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        name="City"
                        id="city"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                        placeholder="City"
                        readOnly
                        value={`${field.userHouse.city}`}
                      />
                    </div>
                    <div className="flex-1">
                      <label
                        htmlFor="state"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        State
                      </label>
                      <input
                        type="text"
                        name="State"
                        id="state"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                        placeholder="State"
                        readOnly
                        value={`${field.userHouse.state}`}
                      />
                    </div>
                    <div className="flex-1">
                      <label
                        htmlFor="zipcode"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Zip Code
                      </label>
                      <input
                        type="text"
                        name="Zip Code"
                        id="zipcode"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                        placeholder="Zip Code"
                        readOnly
                        value={`${field.userHouse.zipcode}`}
                      />
                    </div>
                  </div>
                </div>
                <h1 className="font-bold">Package Information:</h1>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2  pb-5">
                    <div className="flex-1">
                      <label
                        htmlFor="package-name"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="Package Name"
                        id="package-name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                        placeholder="Package Name"
                        readOnly
                        value={field.name}
                      />
                    </div>
                    <div className="flex-1">
                      <label
                        htmlFor="initialPrice"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Initial Price
                      </label>
                      <input
                        type="text"
                        name="Initial Price"
                        id="initialPrice"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                        placeholder="Initial Price"
                        readOnly
                        value={field.initialPrice}
                      />
                    </div>
                    <div className="flex-1">
                      <label
                        htmlFor="range"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Range
                      </label>
                      <input
                        type="text"
                        name="Range"
                        id="range"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                        placeholder="Range"
                        readOnly
                        value={`${field.range} ft2`}
                      />
                    </div>
                  </div>
                  <h1 className="pl-4">Services included:</h1>
                  {field.services.map((service) => (
                    <div
                      key={service.name}
                      className="flex flex-row pl-5 justify-between w-70"
                    >
                      <div>{service.name}</div>
                      <div>({service.quantity}) times / year</div>
                    </div>
                  ))}
                </div>
                {field.purchaseStatus === "PENDING_REVIEW" && (
                  <div className="flex justify-end mt-10">
                    <button
                      type="button"
                      onClick={() => {}}
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

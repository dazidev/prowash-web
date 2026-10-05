"use client";

import { useState } from "react";
import { Spinner } from "../common/loading/Spinner";
import { sendContact } from "@/actions";
import { ErrorDialog, SuccessDialog } from "../common";

type StatusType = null | "loading" | "loaded";

interface LoadingInt {
  status: StatusType;
  message: string;
}

export const FormContact = () => {
  const [loading, setLoading] = useState<LoadingInt>({
    status: null,
    message: "",
  });
  const [error, setError] = useState("");

  const handleSend = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading((prev) => ({ ...prev, status: "loading" }));

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("first-name")?.toString()!,
      lastname: formData.get("last-name")?.toString()!,
      email: formData.get("email")?.toString()!,
      zipcode: formData.get("zip-code")?.toString()!,
      phone: formData.get("phone-number")?.toString()!,
      comments: formData.get("comments")?.toString()!,
    };

    const response = await sendContact(data);

    if (!response.success) {
      setLoading((prev) => ({ ...prev, status: "loaded" }));
      setError(response.message!);
      return;
    }

    form.reset();
    setLoading((prev) => ({ message: response.message!, status: "loaded" }));
  };

  return (
    <form
      className="flex flex-col h-auto w-full sm:w-[1000px] bg-pblue/90 rounded-2xl text-center gap-5 p-5"
      onSubmit={(e) => {
        handleSend(e);
      }}
    >
      <h1 className="text-5xl text-center text-white font-bold">CONTACT US</h1>
      <div className="flex flex-row gap-5">
        <input
          placeholder="First Name"
          className="flex-1 min-w-0 px-4 py-3.5 bg-neutral-200 border-2 border-gray-200/20 rounded-xl text-black placeholder-zinc-800 outline-none focus:bg-neutral-100 focus:border-gray-200"
          required
          type="text"
          name="first-name"
        />
        <input
          placeholder="Last Name"
          className="flex-1 min-w-0 px-4 py-3.5 bg-neutral-200 border-2 border-gray-200/20 rounded-xl text-black placeholder-zinc-800 outline-none focus:bg-neutral-100 focus:border-gray-200"
          required
          type="text"
          name="last-name"
        />
      </div>
      <input
        placeholder="Email"
        className="w-full min-w-0 px-4 py-3.5 bg-neutral-200 border-2 border-gray-200/20 rounded-xl text-black placeholder-zinc-800 outline-none focus:bg-neutral-100 focus:border-gray-200"
        required
        type="email"
        name="email"
      />
      <div className="flex flex-row gap-5">
        <input
          placeholder="Zip Code"
          className="flex-1 min-w-0 px-4 py-3.5 bg-neutral-200 border-2 border-gray-200/20 rounded-xl text-black placeholder-zinc-800 outline-none focus:bg-neutral-100 focus:border-gray-200"
          type="number"
          name="zip-code"
        />
        <input
          placeholder="Phone Number"
          className="flex-1 min-w-0 px-4 py-3.5 bg-neutral-200 border-2 border-gray-200/20 rounded-xl text-black placeholder-zinc-800 outline-none focus:bg-neutral-100 focus:border-gray-200"
          required
          type="number"
          name="phone-number"
        />
      </div>
      <textarea
        placeholder="Comments"
        className="w-full min-w-0 px-4 py-3.5 bg-neutral-200 border-2 border-gray-200/20 rounded-xl text-black placeholder-zinc-800 outline-none focus:bg-neutral-100 focus:border-gray-200"
        required
        maxLength={200}
        rows={5}
        name="comments"
      />

      <button
        type="submit"
        className="w-full px-6 py-4 bg-sgreen text-black text-xl font-bold rounded-xl hover:bg-pgreen hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/20 active:translate-y-0 tracking-wide"
      >
        {loading.status === "loading" ? (
          <Spinner size="w-7 h-7" />
        ) : (
          <p>Contact</p>
        )}
      </button>

      {error && <ErrorDialog error={error} />}
      {loading.status === "loaded" && (
        <SuccessDialog message={loading.message} />
      )}
    </form>
  );
};

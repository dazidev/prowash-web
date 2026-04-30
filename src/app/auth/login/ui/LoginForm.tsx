"use client";

import { useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { authenticate } from "@/actions";
import { Spinner } from "@/components/common/loading/Spinner";

export const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPass, setShowPass] = useState<boolean>(false);

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);

    let deviceId = localStorage.getItem("deviceId");
    const userAgent = navigator.userAgent;

    if (!deviceId) {
      deviceId = crypto.randomUUID();
      localStorage.setItem("deviceId", deviceId);
    }

    const data = {
      email: formData.get("email")?.toString()!,
      password: formData.get("password")?.toString()!,
      deviceId,
      deviceInfo: userAgent,
    };

    const result = await authenticate(data);

    if (result) {
      setErrorMessage(result);
    }

    setIsLoading(false);
    return;
  };

  const handleShowPass = () => {
    setShowPass((prev) => !prev);
  };

  return (
    <form onSubmit={(e) => login(e)} className="flex flex-col">
      <label className="text-white" htmlFor="email">
        Email
      </label>
      <input
        placeholder="Enter you email..."
        className="w-full h-14 px-4 py-3.5 mb-2 border-2 border-white rounded-xl bg-neutral-200 placeholder-zinc-700 outline-none transition-all duration-300 focus:bg-neutral-100 focus:ring-3 focus:ring-pgreen"
        required
        type="email"
        name="email"
      />

      <label className="text-white" htmlFor="password">
        Password
      </label>
      <div className="relative">
        <input
          type={showPass ? "text" : "password"}
          placeholder="Enter your password..."
          className="w-full h-14 px-4 py-3.5 mb-2 border-2 border-white rounded-xl bg-neutral-200 placeholder-zinc-700 outline-none transition-all duration-300 focus:bg-neutral-100 focus:ring-3 focus:ring-pgreen"
          required
          name="password"
        />

        <button
          type="button"
          className="absolute inset-y-0 right-4 flex items-center pb-2"
          onClick={handleShowPass}
        >
          {showPass ? (
            <FaRegEyeSlash className="text-2xl" />
          ) : (
            <FaRegEye className="text-2xl" />
          )}
        </button>
      </div>

      <button className="text-right text-neutral-200 hover:text-neutral-50 mb-5 sm:mb-5 hover:underline">
        Forgot Password?
      </button>

      {errorMessage && (
        <p className="text-red-500 text-center mb-2 sm:mb-5">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={false}
        className="w-full px-6 py-4 bg-pgreen/95 text-white text-xl font-bold rounded-xl hover:bg-pgreen hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/20 active:translate-y-0 tracking-wide"
        aria-disabled={false}
      >
        {isLoading ? <Spinner size="w-7 h-7" /> : <p>Sign In</p>}
      </button>
    </form>
  );
};

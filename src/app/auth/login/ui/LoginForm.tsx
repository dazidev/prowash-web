"use client";

import { useState } from "react";
import { loginUser } from "@/actions";
import { useAuth } from "@/context/AuthProvider";
import { ActionResponse, LoginResponse, ApiError } from "@/interfaces";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const router = useRouter();
  const { setTokenAccess } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const login = async (formData: FormData) => {
    const res: ActionResponse<LoginResponse | ApiError> =
      await loginUser(formData);

    if (res.success === true && res.data) {
      if ("accessToken" in res.data) {
        setTokenAccess(res.data.accessToken);
        router.push("/crm/home");
        return;
      }
    }

    setErrorMessage(res.message!);
    return;
  };

  return (
    <form action={login} className="flex flex-col">
      <label className="text-white" htmlFor="email">
        Email
      </label>
      <input
        placeholder="Enter you email..."
        className="w-full px-4 py-3.5 mb-2 border-2 border-white rounded-xl bg-neutral-200 placeholder-zinc-700 outline-none transition-all duration-300 focus:bg-neutral-100 focus:ring-3 focus:ring-pgreen"
        required
        type="email"
        name="email"
      />

      <label className="text-white" htmlFor="password">
        Password
      </label>
      <input
        placeholder="Enter your password..."
        className="w-full px-4 py-3.5 mb-2 border-2 border-white rounded-xl bg-neutral-200 placeholder-zinc-700 outline-none transition-all duration-300 focus:bg-neutral-100 focus:ring-3 focus:ring-pgreen"
        required
        type="password"
        name="password"
      />

      <button className="text-right text-neutral-200 hover:text-neutral-50 mb-5 sm:mb-10 hover:underline">
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
        {false ? <p>Loading...</p> : <p>Sign In</p>}
      </button>
    </form>
  );
};

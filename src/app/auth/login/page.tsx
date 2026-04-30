import { LoginForm } from "./ui/LoginForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen/2 bg-pblue/90 rounded-2xl shadow-2xl border border-pblue slide-in px-4 py-4 sm:px-24 sm:py-10 ">
      <div className="flex justify-center pb-5 pr-5 sm:pb-10">
        <Image
          src="/images/logo-big.png"
          alt="Logo"
          width={300}
          height={300}
          priority
          style={{ height: "auto" }}
        ></Image>
      </div>
      <h1
        className={`text-3xl sm:text-5xl mb-2 text-center font-bold text-white`}
      >
        Welcome Back
      </h1>
      <p className="text-center text-xm sm:text-xl text-shadow-neutral-500 mb-5 sm:mb-10 text-white">
        Please enter your info to sign in
      </p>

      <LoginForm />
    </div>
  );
}

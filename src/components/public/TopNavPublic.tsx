"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export const TopNavPublic = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`
        fixed flex top-0 z-50 w-full h-20 justify-center
        transition-all duration-300
        ${scrolled ? "bg-sgreen/80 backdrop-blur-md shadow-lg" : "bg-pblue/80"}
      `}
    >
      <div className="flex flex-row justify-between w-full sm:w-[1350px] px-5 py-3">
        <div className="h-full flex items-center">
          <Image
            src="/images/logo-letters.png"
            alt="logo-letters"
            width={80}
            height={80}
          />
        </div>

        <div className="flex justify-center items-center h-full">
          <ul className="flex flex-row text-3xl font-bold gap-10 transition-colors duration-300">
            <li className={scrolled ? "text-white" : "text-white"}>Services</li>
            <li className={scrolled ? "text-white" : "text-white"}>Packages</li>
            <li className={scrolled ? "text-white" : "text-white"}>Quote</li>
            <li className={scrolled ? "text-white" : "text-white"}>Contact</li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export const TopNavPublic = () => {
  const [scrolled, setScrolled] = useState(false);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);

    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

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
      <div className="flex flex-row justify-between w-full max-w-[1350px] px-5 py-3">
        <div className="h-full flex items-center">
          <Image
            src="/images/logo-letters.png"
            alt="Pro Wash 365 logo"
            width={80}
            height={80}
          />
        </div>

        <div className="flex justify-center items-center h-full">
          <ul className="flex flex-row text-3xl font-bold gap-10 transition-colors duration-300 text-white">
            <li>
              <button
                type="button"
                onClick={() => scrollToSection("services")}
                className="hover:scale-105 transition-transform cursor-pointer"
              >
                Services
              </button>
            </li>

            <li>
              <button
                type="button"
                onClick={() => scrollToSection("coverage")}
                className="hover:scale-105 transition-transform cursor-pointer"
              >
                Coverage
              </button>
            </li>

            <li>
              <button
                type="button"
                onClick={() => scrollToSection("aboutUs")}
                className="hover:scale-105 transition-transform cursor-pointer"
              >
                About Us
              </button>
            </li>

            <li>
              <button
                type="button"
                onClick={() => scrollToSection("contactUs")}
                className="hover:scale-105 transition-transform cursor-pointer"
              >
                Contact Us
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

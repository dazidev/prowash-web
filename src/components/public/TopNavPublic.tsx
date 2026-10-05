"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { IoMenu, IoCloseSharp } from "react-icons/io5";

export const TopNavPublic = () => {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);

    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setOpenMenu(false);
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
        ${scrolled ? "bg-pblue" : "bg-pblue/80"}
      `}
    >
      <div className="relative flex flex-row justify-between w-full max-w-[1450px] px-5 xl:px-10 py-3">
        <div className="h-full flex items-center">
          <Image
            src="/images/logo-letters.png"
            alt="Pro Wash 365 logo"
            width={80}
            height={80}
          />
        </div>

        <div className="hidden sm:flex justify-center items-center h-full">
          <ul className="flex flex-row text-3xl font-bold gap-10 transition-colors duration-300 text-white">
            <li>
              <button
                type="button"
                onClick={() => scrollToSection("services")}
                className="hover:scale-105 active:scale-105 active:text-pgreen transition-transform cursor-pointer"
              >
                Services
              </button>
            </li>

            <li>
              <button
                type="button"
                onClick={() => scrollToSection("packages")}
                className="hover:scale-105 active:scale-105 active:text-pgreen transition-transform cursor-pointer"
              >
                Packages
              </button>
            </li>

            <li>
              <button
                type="button"
                onClick={() => scrollToSection("coverage")}
                className="hover:scale-105 active:scale-105 active:text-pgreen transition-transform cursor-pointer"
              >
                Coverage
              </button>
            </li>

            <li>
              <button
                type="button"
                onClick={() => scrollToSection("aboutUs")}
                className="hover:scale-105 active:scale-105 active:text-pgreen transition-transform cursor-pointer"
              >
                About Us
              </button>
            </li>

            <li>
              <button
                type="button"
                onClick={() => scrollToSection("contactUs")}
                className="hover:scale-105 active:scale-105 active:text-pgreen transition-transform cursor-pointer"
              >
                Contact Us
              </button>
            </li>
          </ul>
        </div>

        <div className="flex sm:hidden items-center">
          <button
            type="button"
            onClick={() => setOpenMenu(!openMenu)}
            className="text-white active:scale-95 transition-transform cursor-pointer"
            aria-label={openMenu ? "Close menu" : "Open menu"}
          >
            {openMenu ? (
              <IoCloseSharp
                size={50}
                className={`${scrolled ? "text-black" : "text-white"}`}
              />
            ) : (
              <IoMenu size={50} />
            )}
          </button>
        </div>

        {openMenu && (
          <div
            className={`absolute top-20 left-0 w-full h-screen ${scrolled ? "bg-sgreen/80 backdrop-blur-md shadow-lg text-black" : "bg-pblue/80 text-white"} shadow-lg sm:hidden`}
          >
            <ul className="flex flex-col items-center gap-10 pt-10 py-8 text-4xl font-bold">
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection("services")}
                  className="active:scale-105 active:text-pgreen transition-transform"
                >
                  Services
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection("packages")}
                  className="hover:scale-105 active:scale-105 active:text-pgreen transition-transform cursor-pointer"
                >
                  Packages
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection("coverage")}
                  className="active:scale-105 active:text-pgreen transition-transform"
                >
                  Coverage
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection("aboutUs")}
                  className="active:scale-105 active:text-pgreen transition-transform"
                >
                  About Us
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection("contactUs")}
                  className="active:scale-105 active:text-pgreen transition-transform"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

"use server";

import Image from "next/image";
import { PrincipalBanner } from "@/components/public/PrincipalBanner";
import { CarouselReviews } from "@/components/common/carousel/CarouselReviews";
import { getPublicPackages, getReviews } from "@/actions";

import { IoLogoInstagram, IoLogoFacebook } from "react-icons/io5";
import CarouselServices from "@/components/common/carousel/CarouselServices";
import { FormContact } from "@/components";
import Link from "next/link";
import { PackagesSection } from "@/components/public/PackagesSection";

export default async function PublicPage() {
  const cities = [
    "Greenville",
    "Greer",
    "Taylors",
    "Mauldin",
    "Simpsonville",
    "Fountain Inn",
    "Spartamburg",
    "Duncan",
    "Moore",
    "Anderson",
    "Williamston",
    "Easly",
  ];

  const [responseReviews, packages] = await Promise.all([
    getReviews(),
    getPublicPackages(),
  ]);

  const reviews = responseReviews ? responseReviews : undefined;

  return (
    <div className="w-full xl:w-[1450px] bg-pblue/40">
      <section id="home">
        <div className="flex flex-col items-center justify-center overflow-hidden">
          <div className="flex flex-row justify-between w-full xl:w-[1450px] px-3 md:px-10 xl:px-15 py-2 text-sm md:text-2xl lg:text-3xl  font-bold text-black bg-sgreen">
            <h1>Call now, get professional advice</h1>
            <h1>+1 (864) 349-3989</h1>
          </div>
          <div className="relative w-full h-[600px]">
            <PrincipalBanner
              image={"/images/banner-1.png"}
              alt={"banner-1"}
              text={"Your home deserves the best, contact us now!"}
            />

            <div className="absolute left-1/2 top-1/4 z-30 h-full w-[350px] md:w-[450xp] -translate-x-1/2 -translate-y-1/3 px-10 xl:left-auto xl:top-0 xl:right-20 xl:w-1/3 xl:translate-x-0 xl:translate-y-0">
              <Image
                src="/images/logo-big.png"
                alt="big-logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>
      <section
        id="services"
        className="min-h-screen flex justify-center items-center w-full px-4 py-28 xl:py-30"
      >
        <div className="flex flex-col items-center justify-center gap-16 w-full xl:w-[1350px] max-h-[900px] xl:py-24 text-2xl md:text-4xl xl:text-5xl text-white font-bold text-center">
          <h1>AS A CLEANING COMPANY WE OFFER THE FOLLOWING SERVICES</h1>

          <div className="w-full py-0 md:py-5 xl:py-10">
            <CarouselServices />
          </div>

          <h1>AND MORE: PAINTING, REMODELING, GARDEN DESIGN</h1>
        </div>
      </section>
      <PackagesSection packages={packages} />
      <section id="coverage" className="flex justify-center w-full">
        <div className="flex flex-col xl:flex-row items-center w-full xl:w-[1350px] min-h-screen justify-between pt-30 pb-10 px-10">
          <div className="flex flex-col justify-between w-full xl:w-7/15 h-auto xl:h-full bg-sgreen px-10 py-2 xl:py-15 max-h-[900px]">
            <h3 className="pb-2 text-2xl md:text-4xl xl:text-6xl font-extrabold text-center xl:px-5">
              We shine in Greenville and beyond! Discover our coverage now.
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {cities.map((city, i) => (
                <div
                  key={i}
                  className="bg-white p-2 text-sm xl:text-4xl text-black text-center font-bold"
                >
                  {city}
                </div>
              ))}
            </div>
          </div>
          <div className="w-full xl:w-8/15 h-full max-h-[900px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52401.4833330151!2d-82.40200886788611!3d34.82876151196402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88578f6662fa1105%3A0xd8aa9d77bf257696!2sGreenville%2C%20SC%2C%20USA!5e0!3m2!1sen!2smx!4v1775100563057!5m2!1sen!2smx"
              className="w-full h-full border-0"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
      <section id="aboutUs" className="flex justify-center items-center w-full">
        <div className="flex flex-col items-center justify-center w-full xl:w-[1350px] min-h-screen px-10">
          <div className="flex flex-col w-full gap-5 xl:gap-20">
            <h1 className="text-2xl md:text-4xl xl:text-5xl text-white font-bold text-center">
              OUR CUSTOMERS RECOMMEND US
            </h1>
            <div className="flex flex-row w-full">
              <CarouselReviews reviews={reviews} />
            </div>
            <h1 className="text-2xl md:text-4xl xl:text-5xl text-white font-bold text-center">
              JOIN OUR SOCIAL MEDIA COMMUNITY AND DISCOVER HOW WE MAKE HOMES
              SHINE!
            </h1>
            <div className="flex flex-row justify-center w-full h-auto gap-5">
              <a
                href="https://www.instagram.com/prowash_365/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IoLogoInstagram
                  width={10}
                  height={10}
                  className="text-white text-3xl xl:text-6xl"
                />
              </a>

              <a
                href="https://www.facebook.com/people/PRO-WASH-365/61553376090039/?_rdr"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IoLogoFacebook
                  width={64}
                  height={64}
                  className="text-white text-3xl xl:text-6xl"
                />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-5"></div>
        </div>
      </section>
      <section id="contactUs" className="flex min-h-screen w-full flex-col">
        <div className="flex flex-1 items-center justify-center w-full px-10">
          <div className="w-full max-w-[1350px] flex justify-center">
            <FormContact />
          </div>
        </div>

        <footer className="flex flex-col md:flex-row w-full justify-center md:justify-between items-center px-2 xl:px-5 py-5 text-black text-xl bg-pgreen">
          <span>&copy; 2023 - 2026 Pro Wash 365. All rights reserved.</span>

          <div className="hidden md:flex text-2xl font-bold gap-5">
            <Link className="hover:scale-105 active:scale-105" href="">
              Privacy Policy
            </Link>

            <p>|</p>

            <Link className="hover:scale-105 active:scale-105" href="">
              Terms & Conditions
            </Link>
          </div>
        </footer>
      </section>
    </div>
  );
}

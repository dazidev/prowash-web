"use server";

import Image from "next/image";
import { PrincipalBanner } from "@/components/public/PrincipalBanner";
import { CarouselReviews } from "@/components/common/carousel/CarouselReviews";
import { getReviews } from "@/actions";

import { IoLogoInstagram, IoLogoFacebook } from "react-icons/io5";
import CarouselServices from "@/components/common/carousel/CarouselServices";

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

  const responseReviews = await getReviews();

  const reviews = responseReviews.success === true ? responseReviews.data : [];

  return (
    <>
      <section>
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-row justify-between w-full sm:w-[1350px] px-15 py-2 text-3xl font-bold text-black bg-sgreen">
            <h1>Call now, get professional advice</h1>
            <h1>+1 (864) 349-3989</h1>
          </div>
          <div className="relative w-full h-[600px] sm:w-[1350px]">
            <PrincipalBanner
              image={"/images/banner-1.png"}
              alt={"banner-1"}
              text={"Your home deserves the best, contact us now!"}
            />

            <div className="absolute top-0 right-20 w-1/3 h-full z-30 px-10">
              <Image
                src={"/images/logo-big.png"}
                alt={"big-logo"}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="flex justify-center w-full">
        <div className="flex flex-col items-center w-full sm:w-[1350px] min-h-screen justify-between py-25 text-5xl text-white font-bold text-center">
          <h1>AS A CLEANING COMPANY WE OFFER THE FOLLOWING SERVICES</h1>
          <div className="flex flex-row w-full">
            <CarouselServices />
          </div>
          <h1>AND MORE: PAINTING, REMODELING, GARDEN DESING</h1>
        </div>
      </section>
      <section className="flex justify-center w-full">
        <div className="flex flex-row items-center w-full sm:w-[1350px] min-h-screen justify-between pt-30 pb-10 px-10">
          <div className="flex flex-col justify-between w-7/15 h-full bg-sgreen px-10 py-15">
            <h3 className="text-6xl font-extrabold text-center px-5">
              We shine in Greenville and beyond! Discover our coverage now.
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {cities.map((city, i) => (
                <div
                  key={i}
                  className="bg-white p-2 text-4xl text-black text-center font-bold"
                >
                  {city}
                </div>
              ))}
            </div>
          </div>
          <div className="w-8/15 h-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52401.4833330151!2d-82.40200886788611!3d34.82876151196402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88578f6662fa1105%3A0xd8aa9d77bf257696!2sGreenville%2C%20SC%2C%20USA!5e0!3m2!1sen!2smx!4v1775100563057!5m2!1sen!2smx"
              className="w-full h-full border-0"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
      <section className="flex justify-center w-full">
        <div className="flex flex-col items-center w-full justify-between sm:w-[1350px] min-h-screen pt-40 pb-20 px-10">
          <div className="flex flex-col w-full gap-20">
            <h1 className="text-5xl text-white font-bold text-center">
              OUR CUSTOMERS RECOMMEND US
            </h1>
            <div className="flex flex-row w-full">
              <CarouselReviews reviews={reviews} />
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <h1 className="text-5xl text-white font-bold text-center">
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
                  className="text-white text-6xl"
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
                  className="text-white text-6xl"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { Autoplay, FreeMode } from "swiper/modules";
import { ServiceCard } from "@/components/public/ServiceCard";
import Image from "next/image";
import { CloseButton } from "../button/CloseButton";
import { useState } from "react";

export const ServiceInfo = {
  HOUSE_WASHING: {
    id: "HOUSE_WASHING",
    title: "HOUSE WASHING",
    cardImage: "/images/services/house-washing.webp",
    beforeImage: "/images/services/details/house-before.webp",
    afterImage: "/images/services/details/house-after.webp",
    description: `Exterior cleaning service that removes dirt, mold, mildew, 
      and contaminants from your home’s surfaces. It helps protect 
      the structure, maintain its value, and give it a fresh, well-kept 
      appearance.`,
  },
  ROOF_WASHING: {
    id: "ROOF_WASHING",
    title: "ROOF WASHING",
    cardImage: "/images/services/roof-washing.webp",
    beforeImage: "/images/services/details/roof-before.webp",
    afterImage: "/images/services/details/roof-after.webp",
    description: `We safely clean roofs by removing algae, moss, and debris 
      that can cause long-term damage. This service helps extend the roof’s 
      lifespan and maintain a clean, polished appearance.`,
  },
  GUTTER_CLEANING: {
    id: "GUTTER_CLEANING",
    title: "GUTTER CLEANING",
    cardImage: "/images/services/gutter-cleaning.webp",
    beforeImage: "/images/services/details/gutter-before.webp",
    afterImage: "/images/services/details/gutter-after.webp",
    description: `Professional gutter cleaning service designed to remove leaves, 
      dirt, and blockages that prevent proper water flow. Keeping gutters clean 
      helps prevent leaks, structural damage, and foundation issues, 
      especially during rainy seasons.`,
  },
  WINDOW_CLEANING: {
    id: "WINDOW_CLEANING",
    title: "WINDOW CLEANING",
    cardImage: "/images/services/window-cleaning.webp",
    beforeImage: "/images/services/details/window-before.webp",
    afterImage: "/images/services/details/window-after.webp",
    description: `We provide detailed window cleaning to remove dust, water stains, 
      and built-up dirt from both interior and exterior surfaces. 
      This service improves natural light and leaves your windows 
      with a bright, streak-free finish.`,
  },
  SIDEWALK_CLEANING: {
    id: "SIDEWALK_CLEANING",
    title: "SIDEWALK CLEANING",
    cardImage: "/images/services/sidewalk-cleaning.webp",
    beforeImage: "/images/services/details/sidewalk-before.webp",
    afterImage: "/images/services/details/sidewalk-after.webp",
    description: `Our sidewalk cleaning service removes dirt, mold, algae, 
      and tough stains that build up over time. This not only improves the 
      appearance of the area but also reduces the risk of slips, 
      providing greater safety.`,
  },
  DRIVEWAY_CLEANING: {
    id: "DRIVEWAY_CLEANING",
    title: "DRIVEWAY CLEANING",
    cardImage: "/images/services/driveway-cleaning.webp",
    beforeImage: "/images/services/details/driveway-before.webp",
    afterImage: "/images/services/details/driveway-after.webp",
    description: `We offer deep driveway cleaning to remove oil stains, 
      tire marks, and embedded dirt. We use high-pressure techniques 
      to restore your driveway’s clean and refreshed appearance.`,
  },
} as const;

export type ServiceKey = keyof typeof ServiceInfo;

export default function CarouselServices() {
  const [serviceSelect, setServiceSelect] =
    useState<ServiceKey>("HOUSE_WASHING");
  const [open, setOpen] = useState<boolean>(false);

  const openServiceDetails = (id: ServiceKey) => {
    setServiceSelect(id);
    setOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      <Swiper
        modules={[FreeMode, Autoplay]}
        slidesPerView={1}
        spaceBetween={15}
        freeMode={true}
        loop={true}
        speed={4000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 25,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        className="mySwiper"
      >
        {Object.values(ServiceInfo).map((service) => (
          <SwiperSlide key={service.id}>
            <button
              type="button"
              className="rounded-2xl hover:bg-pgreen active:bg-pgreen hover:cursor-pointer"
              onClick={() => openServiceDetails(service.id)}
            >
              <ServiceCard image={service.cardImage} title={service.title} />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-2">
          <div className="relative flex flex-col w-[1200px] h-[500px] p-5 rounded-2xl overflow-hidden bg-pblue">
            <div className="absolute top-0 right-5 z-10">
              <CloseButton onClick={setOpen} />
            </div>

            <div className="relative flex flex-row justify-center w-full pb-5">
              <h1 className="text-3xl text-white font-bold">
                {ServiceInfo[serviceSelect].title}
              </h1>
            </div>

            <div className="flex flex-row w-full h-full">
              <div className="relative flex-1">
                <Image
                  src={ServiceInfo[serviceSelect].beforeImage}
                  className="object-cover rounded-l-2xl"
                  fill
                  alt="house-before"
                />
              </div>

              <div className="relative flex-1">
                <Image
                  src={ServiceInfo[serviceSelect].afterImage}
                  className="object-cover rounded-r-2xl"
                  fill
                  alt="house-after"
                />
              </div>
            </div>

            <p className="flex text-2xl text-white pt-5">
              {ServiceInfo[serviceSelect].description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

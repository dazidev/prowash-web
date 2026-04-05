"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { ServiceCard } from "@/components/public/ServiceCard";

export default function CarouselServices() {
  return (
    <>
      <Swiper
        modules={[FreeMode, Autoplay]}
        slidesPerView={4}
        spaceBetween={30}
        freeMode={true}
        loop={true}
        speed={4000} // 🔥 velocidad continua
        autoplay={{
          delay: 0, // 🔥 sin pausa
          disableOnInteraction: false,
        }}
        className="mySwiper"
      >
        <SwiperSlide>
          <ServiceCard
            image={"/images/services/house-washing.webp"}
            title={"house washing"}
          />
        </SwiperSlide>

        <SwiperSlide>
          <ServiceCard
            image={"/images/services/roof-washing.webp"}
            title={"roof washing"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <ServiceCard
            image={"/images/services/gutter-cleaning.webp"}
            title={"gutter cleaning"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <ServiceCard
            image={"/images/services/window-cleaning.webp"}
            title={"window cleaning"}
          />
        </SwiperSlide>
        <SwiperSlide>
          <ServiceCard
            image={"/images/services/sidewalk-cleaning.webp"}
            title={"Sidewalk cleaning"}
          />
        </SwiperSlide>

        <SwiperSlide>
          <ServiceCard
            image={"/images/services/driveway-cleaning.webp"}
            title={"Driveway cleaning"}
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

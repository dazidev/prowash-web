"use client";

import { Swiper } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Carousel = ({ children }: Props) => {
  return (
    <div className="relative w-full h-auto">
      <Swiper
        observer={true}
        observeParents={true}
        autoHeight={true}
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        loop={true}
        modules={[Pagination, Navigation]}
        className="mySwiper rounded-2xl shadow-2xl overflow-hidden"
      >
        {children}
      </Swiper>
    </div>
  );
};

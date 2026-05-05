"use client";

import { ReviewCard } from "@/components/public/ReviewCard";
import { Review } from "@/interfaces";
import { useEffect, useState } from "react";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Props {
  reviews: Review[] | undefined;
}

export const CarouselReviews = ({ reviews }: Props) => {
  const [groupedReviews, setGroupedReviews] = useState<Review[][]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  useEffect(() => {
    if (!reviews) return;

    const groupSize = isMobile ? 2 : 3;
    const grouped = chunkArray(reviews, groupSize);

    setGroupedReviews(grouped);
  }, [reviews, isMobile]);

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
      className="w-full"
    >
      {groupedReviews.map((group, index) => (
        <SwiperSlide key={index}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 justify-center">
            {group.map((review, reviewIndex) => (
              <ReviewCard
                key={`${review.name}-${reviewIndex}`}
                stars={review.rating}
                name={review.name}
                comment={review.comment}
              />
            ))}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export function chunkArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];

  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }

  return result;
}

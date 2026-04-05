"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { chunkArray } from "@/infrastructure/utils/chunkArray";
import { ReviewCard } from "@/components/public/ReviewCard";
import { Review } from "@/interfaces";
import { useEffect, useState } from "react";

interface Props {
  reviews: Review[] | undefined;
}

export const CarouselReviews = ({ reviews }: Props) => {
  const [data, setData] = useState<Review[][] | undefined>(undefined);

  useEffect(() => {
    if (reviews === undefined) return;
    const grouped = chunkArray(reviews, 3);
    setData(grouped);
  }, [reviews]);

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        {data &&
          data.map((group, i) => (
            <SwiperSlide key={i}>
              <div className="felx justify-center grid grid-cols-1 md:grid-cols-3 gap-3">
                {group.map((review, j) => (
                  <ReviewCard
                    key={j}
                    stars={review.rating}
                    name={review.name}
                    comment={review.comment}
                  />
                ))}
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

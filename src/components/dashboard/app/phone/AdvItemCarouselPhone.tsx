"use client";

import Image from "next/image";
import Carousel from "../../Carousel/Carousel";

type ImageObj = {
  image1: string | null;
  image2: string | null;
  image3: string | null;
  image4: string | null;
  image5: string | null;
};

interface Props {
  text: string;
  images: ImageObj;
}

export const AdvItemCarouselPhone = ({ text, images }: Props) => {
  const slides = Object.values(images ?? {})
    .filter((img): img is string => !!img)
    .map((img, i) => (
      <div key={`${img}-${i}`} className="relative h-full w-full bg-gray-100">
        <Image
          src={`https://images.prowash365.com/${img}`}
          alt={`Advertising image ${i + 1}`}
          fill
          sizes="240px"
          className="object-contain"
        />
      </div>
    ));

  return (
    <li className="mb-2 flex w-full gap-2 rounded-lg bg-white p-2 shadow-sm">
      <div className="shrink-0">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-semibold">
          PW
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold leading-5 text-black">
          Prowash 365
        </p>

        <p className="whitespace-pre-wrap text-sm leading-5 text-gray-700 [overflow-wrap:anywhere]">
          {text}
        </p>
        {slides.length > 0 && (
          <Carousel key={slides.length} className="mt-2">
            {slides}
          </Carousel>
        )}
      </div>
    </li>
  );
};

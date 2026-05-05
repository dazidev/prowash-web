"use client";
import Image from "next/image";

interface Props {
  image: string;
  alt: string;
  text: string;
}

export const PrincipalBanner = ({ image, alt, text }: Props) => {
  return (
    <>
      <div className="relative z-10 w-full h-full">
        <Image src={image} alt={alt} fill className="object-cover z-10" />
      </div>
      <div className="relative flex bottom-24 md:bottom-36 w-full h-24 md:h-36 z-20 bg-pgreen/80">
        <div className="flex w-full xl:w-2/3 h-full px-10 xl:px-30 justify-center items-center overflow-hidden">
          <span className="flex w-full h-auto text-2xl md:text-4xl lg:text-5xl text-white font-bold text-center justify-center items-center">
            {text}
          </span>
        </div>
      </div>
    </>
  );
};

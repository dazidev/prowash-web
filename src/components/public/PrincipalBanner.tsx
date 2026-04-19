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
      <div className="relative flex bottom-35 w-full h-35 z-20 bg-pgreen/80">
        <div className="flex w-2/3 h-full justify-center items-center px-30">
          <h1 className="flex text-5xl text-white font-bold text-center">
            {text}
          </h1>
        </div>
      </div>
    </>
  );
};

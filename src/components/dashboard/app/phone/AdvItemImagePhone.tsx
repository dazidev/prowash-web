"use client";

import Image from "next/image";

interface Props {
  text: string;
  image: string;
}

export const AdvItemImagePhone = ({ text, image }: Props) => {
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
        <div className="relative mt-2 aspect-[3/2] w-full overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={`https://images.prowash365.com/${image}`}
            alt="Advertising image"
            fill
            sizes="240px"
            className="object-contain"
          />
        </div>
      </div>
    </li>
  );
};

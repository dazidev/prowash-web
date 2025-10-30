'use client'

import Image from "next/image"
import Carousel from "../../Carousel/Carousel"

type ImageObj = {
  image1: string | null
  image2: string | null
  image3: string | null
  image4: string | null
  image5: string | null
}

interface Props {
  text: string
  images: ImageObj
}

export const AdvItemCarouselPhone = ({ text, images }: Props) => {

  const slides =
    Object.values(images ?? {})            //* si images es null retorna vacio {}
      .filter((img): img is string => !!img) //* elimina null o undefined
      .map((img, i) => (
        <Image
          key={i}
          src={`https://images.prowash365.com/${img}`}
          alt="goku"
          width={900}
          height={300}
          className="sm:rounded-l-lg"
        />
      ));

  return (
    <li className="flex flex-row p-2 mb-1 bg-white w-full h-auto shadow-sm sm:rounded-lg">
      <div className="flex flex-row">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-semibold">
          PW
        </div>
      </div>
      <div className="ml-2">
        <p className="text-xl text-black">Prowash 365</p>
        <p className="text-xl font-extralight">{text}</p>
        <Carousel>
          {slides}
        </Carousel>
      </div>
    </li>
  )
}
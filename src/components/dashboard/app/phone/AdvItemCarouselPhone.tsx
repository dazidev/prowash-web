'use client'

import Image from "next/image"
import Carousel from "../../Carousel/Carousel"

interface Props {
  text: string
}

export const AdvItemCarouselPhone = ({ text }: Props) => {
  return (
    <li className="flex flex-row p-2 bg-white w-full h-auto shadow-sm sm:rounded-lg">
      <div className="flex flex-row">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-semibold">
          PW
        </div>
      </div>
      <div className="ml-2">
        <p className="text-xl text-black">Prowash 365</p>
        <p className="text-xl font-extralight">{text}</p>
        <Carousel>
          <Image
            src={'https://wallpapers.com/images/featured/goku-e2us8ym3rraxbnve.jpg'}
            alt="goku"
            width={900}
            height={300}
            className="sm:rounded-l-lg"
          />
          <Image
            src={'https://wallpapers.com/images/featured/goku-e2us8ym3rraxbnve.jpg'}
            alt="goku"
            width={900}
            height={300}
            className="sm:rounded-l-lg"
          />
          <Image
            src={'https://wallpapers.com/images/featured/goku-e2us8ym3rraxbnve.jpg'}
            alt="goku"
            width={900}
            height={300}
            className="sm:rounded-l-lg"
          />
        </Carousel>
      </div>
    </li>
  )
}
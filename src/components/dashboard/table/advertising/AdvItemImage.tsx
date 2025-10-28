'use client'

import Image from "next/image"

interface Props {
  order: number,
  text: string
}

export const AdvItemImage = ({ order, text }: Props) => {
  return (
    <li className="flex flex-row bg-white w-full h-auto p-4 mb-4 shadow-sm sm:rounded-lg">
      <div className="w-[50%] my-5 ml-5">
        <Image
          src={'https://wallpapers.com/images/featured/goku-e2us8ym3rraxbnve.jpg'}
          alt="goku"
          width={900}
          height={300}
          className="sm:rounded-lg"
        />
      </div>
      <div className="w-[50%]">
        <div className="flex flex-row justify-between mx-5 mt-5">
          <div className="flex flex-row gap-4 font-black">
            <div className="">
              <h1 className="text-sm text-gray-700">TYPE</h1>
              <p className="text-xl">IMAGE</p>
            </div>
            <div className="">
              <h1 className="text-sm text-gray-700">ORDER</h1>
              <p className="text-xl">{order}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button className="bg-red-500 hover:bg-red-600 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="h-0.5 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full m-5"></div>

        <div className="mb-5 ml-5">
          <h1 className="text-sm text-gray-700 font-black">TEXT</h1>
          <p className="text-2xl font-extralight">{text}</p>
        </div>
      </div>
    </li>
  )
}
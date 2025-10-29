import React from 'react'
import { AdvItemTextPhone } from './phone/AdvItemTextPhone'
import { AdvItemImagePhone } from './phone/AdvItemImagePhone'
import { AdvItemCarouselPhone } from './phone/AdvItemCarouselPhone'

export const MockupPhone = () => {
  return (
    <div className="flex items-center justify-center">
      {/*<!-- iPhone 15 Container -->*/}
      <div className="relative w-100 h-200 rounded-[45px] shadow-[0_0_2px_2px_rgba(255,255,255,0.1)] border-8 border-zinc-900">
        {/*<!-- Dynamic Island -->*/}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-30 h-8 bg-zinc-900 rounded-full z-20">
        </div>

        <div className="absolute -inset-[1px] border-[3px] border-zinc-700 border-opacity-40 rounded-[37px] pointer-events-none"></div>


        {/*<!-- Screen Content -->*/}
        <div className="relative w-full h-full  rounded-[37px] overflow-y-auto scrollbar-hide flex flex-col p-4 pt-15 items-center bg-zinc-900/10">
          
          <AdvItemTextPhone text='Anuncio de prowash'/>
          <AdvItemImagePhone text='Anuncio de prowash'/>
          <AdvItemCarouselPhone text='Anuncio de prowash'/>


          {/*<svg className="text-zinc-700 h-40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="currentColor" d="M17.05 20.28c-.98.95-2.05.8-3.08.35c-1.09-.46-2.09-.48-3.24 0c-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8c1.18-.24 2.31-.93 3.57-.84c1.51.12 2.65.72 3.4 1.8c-3.12 1.87-2.38 5.98.48 7.13c-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25c.29 2.58-2.34 4.5-3.74 4.25" />
          </svg>*/}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-12 bg-zinc-600 blur-[80px]">
            
          </div>
        </div>

        {/*<!-- Left Side Buttons -->*/}
        {/*<!-- Silent Switch -->*/}
        <div className="absolute left-[-12px] top-20 w-[6px] h-8 bg-zinc-900 rounded-l-md shadow-md"></div>

        {/*<!-- Volume Up -->*/}
        <div className="absolute left-[-12px] top-36 w-[6px] h-12 bg-zinc-900 rounded-l-md shadow-md"></div>

        {/*<!-- Volume Down -->*/}
        <div className="absolute left-[-12px] top-52 w-[6px] h-12 bg-zinc-900 rounded-l-md shadow-md"></div>

        {/*<!-- Right Side Button (Power) -->*/}
        <div className="absolute right-[-12px] top-36 w-[6px] h-16 bg-zinc-900 rounded-r-md shadow-md"></div>
      </div>
    </div>
  )
}


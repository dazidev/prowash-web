'use client'

import { SelectAdvertising } from "../select/SelectAdvertising"
import { AdvItemCarousel } from "./advertising/AdvItemCarousel"
import { AdvItemImage } from "./advertising/AdvItemImage"
import { AdvItemText } from "./advertising/AdvItemText"

export const TableAdvertising = () => {
  return (
    <section className="flex h-full min-h-0 w-full flex-col">
      {/*
        //todo: texto, texto e imagen, texto y carrusel, texto y video 
      */}
      <div className="flex items-center gap-5 m-2 shrink-0">
        <h1 className="text-4xl font-bold">Add advertising sections</h1>
        <SelectAdvertising />

      </div>
      <ul className="flex-1 min-h-0 overflow-y-auto bg-gray-200 rounded-xl p-4 pr-2 mb-4 list-none">
        <AdvItemText order={1} text="Hola a todos a prowash"/>
        <AdvItemImage order={2} text="Hola a todos esto es una imagen"/>
        <AdvItemCarousel order={3} text="HOLA CARROUSEL"/>
      </ul>
      
    </section>
  )
}

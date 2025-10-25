'use client'

import { SelectAdvertising } from "../select/SelectAdvertising"

export const TableAdvertising = () => {
  return (
    <>
      {/*
        //todo: texto, texto e imagen, texto y carrusel, texto y video 
      */}
      <div className="flex flex-row m-8 gap-5">
        <h1 className="text-4xl font-bold">Add advertising sections</h1>
        <SelectAdvertising />
      </div>
    </>
  )
}

'use client'

import { AdItem, ErrorApi } from "@/infrastructure"
import { SelectAdvertising } from "../select/SelectAdvertising"
import { AdvItemCarousel } from "./advertising/AdvItemCarousel"
import { AdvItemImage } from "./advertising/AdvItemImage"
import { AdvItemText } from "./advertising/AdvItemText"
import { deleteAdvertising } from "@/app/crm/dashboard/app/actions"
import toast from "react-hot-toast"
import VimeoPlayer from "../video/VimeoPlayer"
import { AdvItemVideo } from "./advertising/AdvItemVideo"

type ImageObj = {
  image1: string | null
  image2: string | null
  image3: string | null
  image4: string | null
  image5: string | null
}

interface Props {
  data: AdItem[] | null
}

export const TableAdvertising = ({ data }: Props) => {

  let allOrder = [1, 2, 3, 4, 5] //* Editar si se quiere mas publicidad.
  if (data !== null) {
    const orderData = data.map(d => d.order)
    allOrder = allOrder.filter(a => !orderData.includes(a))
  }

  const handleRemove = async (id: string) => {
    try {
      const response: boolean | ErrorApi = await deleteAdvertising(id)

      if (typeof response === 'boolean' && response === true)
        return toast.success('The advertising has been delete successfully')

      if (typeof response === 'object')
        return toast.error(response.message)
    } catch (error) {
      return toast.error(`${error}`)
    }
  }

  return (
    <section className="flex h-full min-h-0 w-full flex-col">
      {/*
        //todo: texto, texto e imagen, texto y carrusel, texto y video 
      */}
      <div className="flex items-center gap-5 m-2 shrink-0">
        <h1 className="text-4xl font-bold">Add advertising sections</h1>
        <SelectAdvertising availableOrder={allOrder} />

      </div>
      <ul className="flex-1 min-h-0 overflow-y-auto bg-gray-200 rounded-xl p-4 pr-2 mb-4 list-none">
        {
          data !== null && (
            data.map((ad) => {
              if (ad.type === 'TEXT') { //! todo: cambiar por switch
                return (
                  <AdvItemText
                    key={ad.id}
                    id={ad.id}
                    order={ad.order}
                    text={ad.text!}
                    handleRemove={handleRemove}
                  />
                )
              }
              else if (ad.type === 'IMAGE') {
                return (
                  <AdvItemImage 
                    key={ad.id}
                    id={ad.id}
                    order={ad.order} 
                    text={ad.text} 
                    image={ad.image1!}
                    handleRemove={handleRemove}
                  />
                )
              }
              else if (ad.type === 'IMAGE_CAROUSEL') {
                const images: ImageObj = {
                  image1: ad.image1,
                  image2: ad.image2,
                  image3: ad.image3,
                  image4: ad.image4,
                  image5: ad.image5,
                }
                return (
                  <AdvItemCarousel 
                    key={ad.id}
                    id={ad.id}
                    order={ad.order}
                    text={ad.text!}
                    images={images}
                    handleRemove={handleRemove}
                  />
                )
              }
              else if (ad.type === 'VIDEO') {
                console.log(ad.video)
                return (
                  <AdvItemVideo
                    key={ad.id}
                    id={ad.id}
                    order={ad.order}
                    text={ad.text}
                    videoId={ad.video!}
                    handleRemove={handleRemove}
                  />
                )
              }
            })
          )
        }

        

        {/*<AdvItemText order={1} text="Hola a todos a prowash"/>
        <AdvItemImage order={2} text="Hola a todos esto es una imagen"/>
        <AdvItemCarousel order={3} text="HOLA CARROUSEL"/>*/}
      </ul>

    </section>
  )
}

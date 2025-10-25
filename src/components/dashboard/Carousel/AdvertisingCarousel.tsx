'use client'

import { useEffect, useState } from "react"
import { ImageInput } from "../input/ImageInput"
import { NumberInput } from "../input/NumberInput"
import Carousel from "./Carousel"

type ImageObj = {
  image1: File | null
  image2: File | null
  image3: File | null
  image4: File | null
  image5: File | null
}

type PreviewObj = {
  image1: string | null
  image2: string | null
  image3: string | null
  image4: string | null
  image5: string | null
}

export const AdvertisingCarousel = () => {
  const [imageAmount, setImageAmount] = useState(3)
  const [imageFile, setImageFile] = useState<ImageObj>({
    image1: null, image2: null, image3: null, image4: null, image5: null
  })
  const [preview, setPreview] = useState<PreviewObj>({
    image1: null, image2: null, image3: null, image4: null, image5: null,
  })

  let amount = Array.from({ length: imageAmount }, (_, i) => i + 1);

  useEffect(() => {
    amount = Array.from({ length: imageAmount }, (_, i) => i + 1);
  }, [imageAmount])


  return (
    <div>
      <Carousel heightClass="h-56 md:h-96" loop>
        {
          amount.map((num) => {
            const field = `image${num}` as keyof ImageObj
            return (
              <div key={num} className="flex h-full items-center justify-center bg-gray-100">
                <ImageInput
                  inputId={`dropzone-file-${num}`}
                  file={imageFile[field]}
                  setFile={(f: File | null) =>
                    setImageFile(prev => ({ ...prev, [field]: f }))
                  }
                  preview={preview[field]}
                  setPreview={(f: string | null) =>
                    setPreview(prev => ({ ...prev, [field]: f }))
                  }
                />
              </div>
            )
          })
        }
      </Carousel>
      <NumberInput value={imageAmount} setValue={setImageAmount} />
    </div>
  )
}

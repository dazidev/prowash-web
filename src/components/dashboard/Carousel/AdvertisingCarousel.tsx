"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { ImageInput } from "../input/ImageInput";
import { NumberInput } from "../input/NumberInput";
import Carousel from "./Carousel";

type ImageObj = {
  image1: File | null;
  image2: File | null;
  image3: File | null;
  image4: File | null;
  image5: File | null;
};

type PreviewObj = {
  image1: string | null;
  image2: string | null;
  image3: string | null;
  image4: string | null;
  image5: string | null;
};

interface Props {
  imageFile: ImageObj;
  setImageFile: Dispatch<SetStateAction<ImageObj>>;
}

export const AdvertisingCarousel = ({ imageFile, setImageFile }: Props) => {
  const [imageAmount, setImageAmount] = useState(3);
  const [preview, setPreview] = useState<PreviewObj>({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    image5: null,
  });

  const amount = Array.from({ length: imageAmount }, (_, i) => i + 1);

  return (
    <div>
      <Carousel loop>
        {amount.map((num) => {
          const field = `image${num}` as keyof ImageObj;
          return (
            <ImageInput
              key={num}
              inputId={`dropzone-file-${num}`}
              file={imageFile[field]}
              setFile={(f: File | null) =>
                setImageFile((prev) => ({ ...prev, [field]: f }))
              }
              preview={preview[field]}
              setPreview={(f: string | null) =>
                setPreview((prev) => ({ ...prev, [field]: f }))
              }
            />
          );
        })}
      </Carousel>
      <NumberInput value={imageAmount} setValue={setImageAmount} />
    </div>
  );
};

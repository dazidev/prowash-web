"use client";

import { Dispatch, SetStateAction, useMemo, useState } from "react";
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

type PreviewObj = { [K in keyof ImageObj]: string | null };

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

  const previewSetters = useMemo(() => {
    const setter = (field: keyof PreviewObj) => (value: string | null) =>
      setPreview((previous) => ({ ...previous, [field]: value }));

    return {
      image1: setter("image1"),
      image2: setter("image2"),
      image3: setter("image3"),
      image4: setter("image4"),
      image5: setter("image5"),
    };
  }, []);

  const changeAmount = (value: SetStateAction<number>) => {
    const next = typeof value === "function" ? value(imageAmount) : value;

    setImageAmount(next);
    setImageFile((previous) => ({
      ...previous,
      image3: next >= 3 ? previous.image3 : null,
      image4: next >= 4 ? previous.image4 : null,
      image5: next >= 5 ? previous.image5 : null,
    }));
  };

  return (
    <div>
      <Carousel key={imageAmount} loop>
        {Array.from({ length: imageAmount }, (_, index) => {
          const number = index + 1;
          const field = `image${number}` as keyof ImageObj;

          return (
            <ImageInput
              key={number}
              inputId={`dropzone-file-${number}`}
              file={imageFile[field]}
              setFile={(file) =>
                setImageFile((previous) => ({ ...previous, [field]: file }))
              }
              preview={preview[field]}
              setPreview={previewSetters[field]}
            />
          );
        })}
      </Carousel>

      <NumberInput value={imageAmount} setValue={changeAmount} />
    </div>
  );
};

"use client";

import toast from "react-hot-toast";
import { AdvertisingCarousel } from "../Carousel/AdvertisingCarousel";
import { ImageInput } from "../input/ImageInput";
import { useState } from "react";
import { createAdvertising } from "@/app/crm/dashboard/app/actions";
import { ErrorApi } from "@/infrastructure";
import VimeoPlayer from "../video/VimeoPlayer";

type ImageObj = {
  image1: File | null;
  image2: File | null;
  image3: File | null;
  image4: File | null;
  image5: File | null;
};

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  type: "TEXT" | "IMAGE" | "IMAGE_CAROUSEL" | "VIDEO";
  availableOrder: number[];
}

export const AddAdvertisingModal = ({
  open,
  setOpen,
  type,
  availableOrder,
}: Props) => {
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<string>("");
  const [imageFile, setImageFile] = useState<ImageObj>({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    image5: null,
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [text, setText] = useState<string>("");
  const [order, setOrder] = useState<number>(availableOrder[0]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let advData;
    if (type === "TEXT") {
      if (!text) return;
      if (order === 0) return;
      advData = {
        type,
        order,
        text,
      };
    } else if (type === "IMAGE") {
      if (!text) return;
      if (!image) return;
      if (order === 0) return;
      advData = {
        type,
        order,
        text,
        image1: image,
      };
    } else if (type === "IMAGE_CAROUSEL") {
      if (!text) return;
      if (!imageFile["image1"]) return;
      if (!imageFile["image2"]) return;
      if (order === 0) return;
      advData = {
        type,
        order,
        text,
        image1: imageFile["image1"],
        image2: imageFile["image2"],
        image3: imageFile["image3"],
        image4: imageFile["image4"],
        image5: imageFile["image5"],
      };
    } else if (type === "VIDEO") {
      if (!text) return;
      if (!video) return;
      if (order === 0) return;
      advData = {
        type,
        order,
        text,
        video: video,
      };
    }
    try {
      const response: boolean | ErrorApi = await createAdvertising(advData!);
      if (!(typeof response === "boolean"))
        return toast.error(response.message);
      toast.success("The advertising has been create successfully");
    } catch (error) {
      return toast.error(`${error}`);
    }
    setOpen(false);
  };

  return (
    <>
      {open && (
        <div
          id="crud-modal"
          tabIndex={-1}
          className="overflow-y-auto overflow-x-hidden fixed z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            {/*<!-- Modal content -->*/}
            <div className="relative bg-white rounded-lg shadow-sm">
              {/*<!-- Modal header -->*/}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Add Advertising
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                  onClick={() => setOpen(false)}
                >
                  <svg
                    className="w-3 h-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/*<!-- Modal body -->*/}
              <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                <div className="col-span-2 mb-5">
                  <label
                    htmlFor="order"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Order
                  </label>
                  <select
                    id="order"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={order}
                    onChange={(e) => setOrder(Number(e.target.value))}
                  >
                    {availableOrder.map((ao) => (
                      <option key={ao} value={ao}>
                        {ao}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-span-2 mb-5">
                  <label
                    htmlFor="text"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Text
                  </label>
                  <input
                    type="text"
                    name="text"
                    id="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Enter text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                  />
                </div>

                {type === "IMAGE" && (
                  <>
                    <label
                      htmlFor="text"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Image
                    </label>
                    <ImageInput
                      inputId={"dropzone-file-1"}
                      file={image}
                      setFile={setImage}
                      preview={preview}
                      setPreview={setPreview}
                    />
                  </>
                )}

                {type === "IMAGE_CAROUSEL" && (
                  <>
                    <label
                      htmlFor="text"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Images
                    </label>
                    <AdvertisingCarousel
                      imageFile={imageFile}
                      setImageFile={setImageFile}
                    />
                  </>
                )}

                {type === "VIDEO" && (
                  <>
                    <label
                      htmlFor="text"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      ID
                    </label>
                    <input
                      type="text"
                      name="text"
                      id="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      placeholder="Enter text"
                      value={video}
                      onChange={(e) => setVideo(e.target.value)}
                      required
                    />
                    {video && (
                      <div className="mt-5">
                        <label
                          htmlFor="text"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Video
                        </label>
                        <VimeoPlayer videoId={video} />
                      </div>
                    )}
                  </>
                )}

                <div className="flex justify-end mt-10">
                  <button
                    type="submit"
                    className="text-white inline-flex items-end bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    <svg
                      className="me-1 -ms-1 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Add Advertising
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

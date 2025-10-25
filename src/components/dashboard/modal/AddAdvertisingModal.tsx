'use client'

import toast from "react-hot-toast"
import { AdvertisingCarousel } from "../Carousel/AdvertisingCarousel"
import { NumberInput } from "../input/NumberInput"
import { ImageInput } from "../input/ImageInput"
import { useState } from "react"

interface Props {
  open: boolean
  setOpen: (value: boolean) => void
  type: 'TEXT' | 'IMAGE' | 'IMAGE_CAROUSEL' | 'VIDEO'
}

export const AddAdvertisingModal = ({ open, setOpen, type }: Props) => {
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      toast.success('The password administrator has been edit successfully')
    } catch (error) {
      return toast.error(`${error}`)
    }

    setOpen(false)
  }

  return (
    <>
      {
        open && (
          <div id="crud-modal" tabIndex={-1} className="overflow-y-auto overflow-x-hidden fixed z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full" >
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
                    <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/*<!-- Modal body -->*/}
                <form className="p-4 md:p-5" onSubmit={handleSubmit}>

                  <div className="col-span-2 mb-5">
                    <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900">Text</label>
                    <input type="text" name="text" id="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Enter text" required
                    />
                  </div>

                                    
                  {
                    type === 'IMAGE' && (
                      <>
                        <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900">Image</label>
                        <ImageInput
                          inputId={'dropzone-file-1'}
                          file={image}
                          setFile={setImage}
                          preview={preview}
                          setPreview={setPreview}
                        />
                      </>
                    )
                  }
                  {
                    type === 'IMAGE_CAROUSEL' && (
                      <>
                        <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900">Images</label>
                        <AdvertisingCarousel/>
                      </>
                    )
                  }                
                  <div className="flex justify-end mt-10">
                    <button type="submit" className="text-white inline-flex items-end bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                      <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                      Add Advertising
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div >
        )
      }
    </>
  )
}

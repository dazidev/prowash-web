'use client'

import { useState } from "react"
import { AddAdvertisingModal } from "../modal/AddAdvertisingModal"

interface Props {
  label?: string
}

type TypeAd = 'TEXT' | 'IMAGE' | 'IMAGE_CAROUSEL' | 'VIDEO'

export const SelectAdvertising = ({ label }: Props) => {
  const [open, setOpen] = useState(false)
  const [typeAd, setTypeAd] = useState<TypeAd>('TEXT')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setOpen(!open)
  }

  return (
    <>
      <form className="max-w-7xl" onSubmit={handleSubmit}>
        <div className="flex flex-row gap-5 justify-end items-center">
          {
            label && (
              <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900">Select an option</label>
            )
          }
          
          <select 
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={typeAd}
            onChange={(e) => setTypeAd(e.target.value as TypeAd)}
          >
            <option value="TEXT" selected>Only text</option>
            <option value="IMAGE">Text + image</option>
            <option value="IMAGE_CAROUSEL">Text + image carousel</option>
            <option value="VIDEO">Text + video</option>
          </select>

          <div className="flex">
            <button type="submit" className="text-white inline-flex items-end bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
              Add
            </button>
          </div>
        </div>
      </form>
      <AddAdvertisingModal open={open} setOpen={setOpen} type={typeAd} />
    </>
  )
}

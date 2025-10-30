'use client';

import { useEffect, useState } from 'react';

interface Props {
  file: File | null
  setFile: (f: File | null) => void
  preview: string | null
  setPreview: (f: string | null) => void
  inputId: string
}

const MAX_MB = 2
const MAX_BYTES = MAX_MB * 1024 * 1024

export const ImageInput = ({ file, setFile, preview, setPreview, inputId }: Props) => {
  const [error, setError] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null
    if (f?.size! > MAX_BYTES) return setError('The image exceeds the maximum allowed size of 2 MB.')
    setError('')
    setFile(f)
  };

  useEffect(() => {
    if (!file) {
      setPreview(null)
      return
    }
    const url = URL.createObjectURL(file)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  return (
    <div className="flex justify-center aspect-[3/2]">
      <label
        htmlFor={inputId}
        className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 overflow-hidden"
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-600">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">SVG, PNG, JPG o GIF (ASPECT 3:2)</p>
            {
              error && (<p className="text-xs text-red-700 mt-2">{error}</p>)
            }
          </div>
        )}

        <input
          id={inputId}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onChange}
        />
      </label>

    </div>
  );
};


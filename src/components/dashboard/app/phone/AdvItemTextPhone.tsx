'use client'

interface Props {
  text: string
}

export const AdvItemTextPhone = ({ text }: Props) => {
  return (
    <li className="flex flex-row p-2 mb-4 bg-white w-full h-auto shadow-sm sm:rounded-lg">
      <div className="flex flex-row">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-semibold">
          PW
        </div>
      </div>
      <div className="ml-2">
        <p className="text-xl text-black">Prowash 365</p>
        <p className="text-xl font-extralight">{text}</p>
      </div>
    </li>
  )
}
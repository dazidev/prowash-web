import React from 'react'
import { TopNavItem } from './TopNavItem'

export const TopNav = () => {
  return (
    <nav className="fixed top-0 z-50 w-[90%] h-20 m-4 rounded-xl">
      <div className="flex flex-row px-3 py-3 lg:px-5 lg:pl-3">

        <div className="flex items-center justify-end pl-5">
          <span
            className='text-4xl font-extrabold text-[#0841D9]'
          >
            PROWASH
          </span>
          <span
            className='text-4xl font-extrabold text-[#97c000] ml-2'
          >
            365
          </span>

        </div>

        <div className='flex-1'>
          <ul className='flex flex-row justify-center'>
            <TopNavItem
              path="/crm/dashboard"
              labelText="HOME"
            />
            <TopNavItem
              path="/crm/dashboard/admins"
              labelText="ADMINS"
            />
            <TopNavItem
              path="/crm/dashboard/clients"
              labelText="CLIENTS"
            />
            <TopNavItem
              path="/crm/dashboard/app"
              labelText="APP"
            />
          </ul>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-semibold">
            DZ
          </div>
          <div className="flex flex-col">
            <div className="text-lg font-semibold text-slate-900">Hi, Daniel Zipa</div>
            <div className="text-sm text-slate-500">danielzipa@outlook.com</div>
          </div>
        </div>

      </div>
    </nav>
  )
}

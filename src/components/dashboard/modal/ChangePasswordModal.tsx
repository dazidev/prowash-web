import { changeAdminPassword } from "@/app/crm/dashboard/admins/actions"
import { regex } from "@/domain"
import { useState } from "react"
import toast from "react-hot-toast"


interface Props {
  id: string
  open: boolean
  setOpen: (value: boolean) => void
}

export const ChangePasswordModal = ({ id, open, setOpen }: Props) => {
  const [newPass, setNewPass] = useState({
    password: '',
    repeatPassword: ''
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!regex.password.test(newPass.password)) return
    if (!regex.password.test(newPass.repeatPassword)) return
    if (!(newPass.password === newPass.repeatPassword)) return

    try {
      const response = await changeAdminPassword(id, newPass.password)
      if (!response.success) return toast.error(`${response.error.code}`)

      toast.success('The password administrator has been edit successfully')
    } catch (error) {
      return toast.error(`${error}`)
    }

    setNewPass({
      password: '',
      repeatPassword: ''
    })
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
                    Change Password
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
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">New Password</label>
                    <input type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Enter Password" required
                      value={newPass.password}
                      onChange={(e) => { setNewPass((prev) => ({ ...prev, password: e.target.value })) }}
                    />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="repeatPassword" className="block mb-2 text-sm font-medium text-gray-900">Confirm New Password</label>
                    <input type="password" name="repeatPassword" id="repeatPassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Enter Password" required
                      value={newPass.repeatPassword}
                      onChange={(e) => { setNewPass((prev) => ({ ...prev, repeatPassword: e.target.value })) }}
                    />
                  </div>
                  <div className="flex justify-end mt-10">
                    <button type="submit" className="text-white inline-flex items-end bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                      <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                      Change Password
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

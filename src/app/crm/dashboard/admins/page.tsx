import { Table } from "@/components/dashboard/table/Table";
import { UsersResponse } from "@/interfaces";

import {config} from 'dotenv'

config()

const getAdminUsers = async() => {
  const admins: UsersResponse = await fetch(`${process.env.API}/api/admin`, {
    method: 'GET',
    next: { tags: ['admins'] }
  }).then(res => res.json()) //! todo: no mezclar estilos

  return admins.data //! todo: manejar el error si no viene el admin.data
}

export default async function UsersPage() {
  const admins = await getAdminUsers()
  const listHeaders = ['Administrator', 'Email', 'Role', 'Status', 'Last Connection', 'Actions']
  return (
    <div className="flex flex-col min-h-[calc(100vh-8.25rem)] bg-gray-200 mx-5 rounded-2xl">
      <div className="m-8">
        <h1 className="text-4xl font-bold ml-5 mt-5">System administrator management</h1>
        <p className="text-2xl text-gray-700 mx-5 mb-10">In this section you can manage the administrators who have access to the system. Add, edit or delete user permissions.</p>
        <Table name={"Administrators"} headers={listHeaders} data={admins}/>
      </div>
    </div>
  );
}
import { getContacts } from "@/actions";
import { Table } from "@/components/dashboard/table/Table";

export const dynamic = "force-dynamic";

export default async function ContactsPage() {
  const contacts = await getContacts();

  const listHeaders = [
    "FullName",
    "Email",
    "Phone",
    "Status",
    "Date",
    "Actions",
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-8.25rem)] bg-gray-200 mx-5 rounded-2xl">
      <div className="m-8">
        <h1 className="text-4xl font-bold ml-5 mt-5">
          System contacts management
        </h1>

        <p className="text-2xl text-gray-700 mx-5 mb-10">
          In this section you can review potential clients who require
          information from the company.
        </p>

        <Table name="Contacts" headers={listHeaders} data={contacts} />
      </div>
    </div>
  );
}

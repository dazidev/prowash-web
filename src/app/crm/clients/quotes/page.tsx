import { getUserQuotes } from "@/actions";
import { Table } from "@/components/dashboard/table/Table";
import { PackageOrderQuote } from "@/interfaces";

export const dynamic = "force-dynamic";

export default async function ClientQuotesPage() {
  const quotes: PackageOrderQuote[] = await getUserQuotes();

  const listHeaders = [
    "Package Name",
    "Email",
    "Phone",
    "Date",
    "Status",
    "Actions",
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-8.25rem)] bg-gray-200 mx-5 rounded-2xl">
      <div className="m-8">
        <h1 className="text-4xl font-bold ml-5 mt-5">
          System quotes management
        </h1>

        <p className="text-2xl text-gray-700 mx-5 mb-10">
          Manage potential clients who are interested in a membership quote.
        </p>

        <Table name="Quotes" headers={listHeaders} data={quotes} />
      </div>
    </div>
  );
}

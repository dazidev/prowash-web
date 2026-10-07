"use client";
import type { WebQuoteRequest, WebQuoteRequestStatus } from "@/interfaces";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { IoEyeOutline } from "react-icons/io5";
import { WebQuoteViewModal } from "../modal/WebQuoteViewModal";

interface Props {
  data: WebQuoteRequest[];
}

type StatusFilter = "ALL" | WebQuoteRequestStatus;

const statusLabels: Record<WebQuoteRequestStatus, string> = {
  PENDING_REVIEW: "Pending review",
  ATTENDED: "Attended",
  CANCELLED: "Cancelled",
};

const statusStyles: Record<WebQuoteRequestStatus, string> = {
  PENDING_REVIEW: "bg-yellow-100 text-yellow-800",
  ATTENDED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

const headers = [
  "Package",
  "Name",
  "Email",
  "Phone",
  "ZIP",
  "Date",
  "Status",
  "Actions",
];

export const WebQuotesTable = ({ data }: Props) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");
  const [selectedQuoteId, setSelectedQuoteId] = useState<string | null>(null);
  const selectedQuote = data.find((quote) => quote.id === selectedQuoteId);

  const query = search.trim().toLowerCase();

  const filteredQuotes = data.filter((quote) => {
    const matchesStatus =
      statusFilter === "ALL" || quote.status === statusFilter;

    const searchableText = [
      quote.packageName,
      quote.name,
      quote.lastname ?? "",
      quote.email,
      quote.phone,
      quote.zipcode ?? "",
    ]
      .join(" ")
      .toLowerCase();

    return matchesStatus && searchableText.includes(query);
  });

  return (
    <div className="m-5 overflow-hidden rounded-lg bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-gray-200 px-6 py-6">
        <h2 className="text-xl font-bold text-black">Website Quotes List</h2>

        <span className="text-sm text-gray-500">
          {filteredQuotes.length} of {data.length} requests
        </span>
      </div>

      <div className="flex flex-col gap-4 px-6 py-6 lg:flex-row">
        <div className="relative flex-1">
          <BiSearch
            aria-hidden="true"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />

          <input
            type="search"
            aria-label="Search website quote requests"
            placeholder="Search by package, name, email, phone or ZIP..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="
              w-full rounded-lg border border-slate-200
              py-3 pl-11 pr-4 text-sm text-black
              outline-none focus:border-transparent
              focus:ring-2 focus:ring-blue-500
            "
          />
        </div>

        <select
          aria-label="Filter quote requests by status"
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value as StatusFilter)
          }
          className="
            rounded-lg border border-slate-200 bg-white
            px-4 py-3 text-sm text-black
            outline-none focus:ring-2 focus:ring-blue-500
          "
        >
          <option value="ALL">All statuses</option>
          <option value="PENDING_REVIEW">Pending review</option>
          <option value="ATTENDED">Attended</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700">
            <tr>
              {headers.map((header) => (
                <th key={header} scope="col" className="px-6 py-3">
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredQuotes.map((quote) => (
              <tr
                key={quote.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-semibold text-black">
                  {quote.packageName}
                </td>
                <td className="px-6 py-4">
                  {quote.name} {quote.lastname ?? ""}
                </td>
                <td className="px-6 py-4">{quote.email}</td>
                <td className="px-6 py-4">{quote.phone}</td>
                <td className="px-6 py-4">{quote.zipcode || "—"}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  {quote.createdAt.slice(0, 10)}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`
                      inline-block whitespace-nowrap rounded-full
                      px-3 py-1 text-xs font-semibold
                      ${statusStyles[quote.status]}
                    `}
                  >
                    {statusLabels[quote.status]}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    type="button"
                    aria-label={`View quote request from ${quote.name}`}
                    onClick={() => setSelectedQuoteId(quote.id)}
                    className="
                      flex h-9 w-9 items-center justify-center
                      rounded-md border border-slate-200 text-slate-500
                      transition-colors hover:border-blue-600
                      hover:bg-blue-50 hover:text-blue-600
                    "
                  >
                    <IoEyeOutline aria-hidden="true" size={19} />
                  </button>
                </td>
              </tr>
            ))}

            {filteredQuotes.length === 0 && (
              <tr>
                <td
                  colSpan={headers.length}
                  className="px-6 py-10 text-center text-gray-500"
                >
                  {data.length === 0
                    ? "No website quote requests yet."
                    : "No matching quote requests."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {selectedQuote && (
        <WebQuoteViewModal
          key={`${selectedQuote.id}:${selectedQuote.updatedAt}`}
          quote={selectedQuote}
          onClose={() => setSelectedQuoteId(null)}
        />
      )}
    </div>
  );
};

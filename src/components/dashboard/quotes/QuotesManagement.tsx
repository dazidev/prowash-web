"use client";
import type {
  ActionResponse,
  PackageOrderQuote,
  WebQuoteRequest,
} from "@/interfaces";
import { useState } from "react";
import { Table } from "../table/Table";
import { WebQuotesTable } from "./WebQuotesTable";

interface Props {
  appQuotes: PackageOrderQuote[];
  webQuotesResponse: ActionResponse<WebQuoteRequest[]>;
}

type QuoteSource = "app" | "website";

const appHeaders = [
  "Package Name",
  "Email",
  "Phone",
  "Date",
  "Status",
  "Actions",
];

export const QuotesManagement = ({ appQuotes, webQuotesResponse }: Props) => {
  const [source, setSource] = useState<QuoteSource>("app");

  const webQuotes = webQuotesResponse.data ?? [];

  const buttonClassName = (selected: boolean) =>
    `
      rounded-lg px-5 py-3 text-sm font-semibold transition-colors
      focus-visible:outline-2 focus-visible:outline-pblue
      ${
        selected
          ? "bg-pblue text-white"
          : "bg-white text-gray-700 hover:bg-gray-100"
      }
    `;

  return (
    <div>
      <div
        role="group"
        aria-label="Quote source"
        className="mx-5 mb-6 flex flex-wrap gap-3"
      >
        <button
          type="button"
          aria-pressed={source === "app"}
          onClick={() => setSource("app")}
          className={buttonClassName(source === "app")}
        >
          App Quotes ({appQuotes.length})
        </button>

        <button
          type="button"
          aria-pressed={source === "website"}
          onClick={() => setSource("website")}
          className={buttonClassName(source === "website")}
        >
          Website Quotes
          {webQuotesResponse.success && ` (${webQuotes.length})`}
        </button>
      </div>

      {source === "app" ? (
        <Table name="Quotes" headers={appHeaders} data={appQuotes} />
      ) : webQuotesResponse.success ? (
        <WebQuotesTable data={webQuotes} />
      ) : (
        <div
          role="alert"
          className="m-5 rounded-lg bg-red-100 p-5 text-red-800"
        >
          {webQuotesResponse.message ??
            "Unable to load website quote requests."}
        </div>
      )}
    </div>
  );
};

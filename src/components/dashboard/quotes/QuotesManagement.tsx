"use client";

import type {
  ActionResponse,
  PackageOrderQuote,
  WebQuoteRequest,
} from "@/interfaces";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Table } from "../table/Table";
import { WebQuotesTable } from "./WebQuotesTable";

interface Props {
  appQuotesResponse: ActionResponse<PackageOrderQuote[]>;
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

export const QuotesManagement = ({
  appQuotesResponse,
  webQuotesResponse,
}: Props) => {
  const router = useRouter();
  const [source, setSource] = useState<QuoteSource>("app");
  const [isReloading, startReload] = useTransition();

  const appQuotes = appQuotesResponse.data ?? [];
  const webQuotes = webQuotesResponse.data ?? [];

  const selectedResponse =
    source === "app" ? appQuotesResponse : webQuotesResponse;

  const reloadQuotes = () => {
    startReload(() => {
      router.refresh();
    });
  };

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
    <div aria-busy={isReloading}>
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
          App Quotes
          {appQuotesResponse.success && ` (${appQuotes.length})`}
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

      {!selectedResponse.success ? (
        <div
          role="alert"
          className="m-5 rounded-lg bg-red-100 p-5 text-red-800"
        >
          <p>
            {selectedResponse.message ??
              (source === "app"
                ? "Unable to load app quote requests."
                : "Unable to load website quote requests.")}
          </p>

          <button
            type="button"
            onClick={reloadQuotes}
            disabled={isReloading}
            className="mt-4 rounded-lg border border-red-300 px-4 py-2 font-semibold hover:bg-red-200 disabled:opacity-50"
          >
            {isReloading ? "Reloading quotes..." : "Retry"}
          </button>
        </div>
      ) : source === "app" ? (
        <Table name="Quotes" headers={appHeaders} data={appQuotes} />
      ) : (
        <WebQuotesTable data={webQuotes} />
      )}
    </div>
  );
};

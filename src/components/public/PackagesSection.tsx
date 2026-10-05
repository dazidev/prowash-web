"use client";
import { PublicPackage } from "@/interfaces";
import { useState } from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { PackageQuoteSelection, QuoteRequestModal } from "./QuoteRequestModal";

interface Props {
  packages: PublicPackage[];
}

interface PackageCardProps {
  packageItem: PublicPackage;
}

const PackageCard = ({ packageItem }: PackageCardProps) => {
  const [selectedPriceId, setSelectedPriceId] = useState(
    packageItem.prices[0]?.id ?? "",
  );
  const [quoteSelection, setQuoteSelection] =
    useState<PackageQuoteSelection | null>(null);

  const selectedPrice =
    packageItem.prices.find((price) => price.id === selectedPriceId) ??
    packageItem.prices[0];

  const handleRequestQuote = () => {
    if (!selectedPrice) return;

    setQuoteSelection({
      packageId: packageItem.id,
      packagePriceId: selectedPrice.id,
      packageName: packageItem.name,
      price: selectedPrice.price,
      rangeName: selectedPrice.name,
      rangeUnit: selectedPrice.unit,
      services: packageItem.services.map((service) => ({
        ...service,
      })),
    });
  };

  return (
    <article className="flex h-full flex-col overflow-hidden ">
      <div className="bg-sgreen px-5 py-4">
        <h3 className="text-center text-3xl font-extrabold text-black md:text-4xl">
          {packageItem.name}
        </h3>
      </div>

      <div className="flex flex-1 flex-col px-5 py-6 mt-6 rounded-3xl bg-white shadow-xl">
        {packageItem.prices.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2">
            {packageItem.prices.map((price) => {
              const selected = price.id === selectedPrice?.id;

              return (
                <button
                  key={price.id}
                  type="button"
                  onClick={() => setSelectedPriceId(price.id)}
                  className={`
                    cursor-pointer rounded-lg px-3 py-2
                    text-sm font-semibold transition-all
                    md:text-base
                    ${
                      selected
                        ? "bg-sgreen text-black"
                        : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300"
                    }
                  `}
                >
                  {price.name} {price.unit}
                </button>
              );
            })}
          </div>
        )}

        {selectedPrice && (
          <div className="flex items-end justify-center gap-2 py-8">
            <span className="mb-2 text-lg text-zinc-500">USD</span>

            <span className="text-6xl font-extrabold text-black">
              {selectedPrice.price.toLocaleString("en-US")}
            </span>

            <span className="mb-2 text-lg text-zinc-500">/ year</span>
          </div>
        )}

        <div className="flex flex-1 flex-col">
          <p className="mb-5 text-center text-lg font-medium text-zinc-500">
            SERVICES INCLUDED
          </p>

          <div className="flex flex-col gap-5">
            {packageItem.services.map((service) => (
              <div
                key={service.id}
                className="flex items-center justify-between gap-3"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <IoCheckmarkCircleOutline className="shrink-0 text-3xl text-pgreen" />

                  <span className="text-lg font-bold text-black md:text-xl">
                    {service.name}
                  </span>
                </div>

                <span className="shrink-0 rounded-full bg-sgreen px-3 py-1 text-sm font-semibold text-black">
                  {service.amount} x year
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-zinc-500">
          * All prices shown are subject to change based on the final quote.
        </p>

        <button
          type="button"
          disabled={!selectedPrice}
          onClick={handleRequestQuote}
          className="
            mt-4 rounded-xl bg-sgreen px-5 py-3
            text-center text-xl font-bold text-black
            transition-transform hover:scale-[1.02] active:scale-[0.98]
            disabled:cursor-not-allowed disabled:opacity-50
          "
        >
          Get a quote
        </button>
      </div>
      {quoteSelection && (
        <QuoteRequestModal
          selection={quoteSelection}
          onClose={() => setQuoteSelection(null)}
        />
      )}
    </article>
  );
};

export const PackagesSection = ({ packages }: Props) => {
  if (packages.length === 0) {
    return null;
  }

  return (
    <section
      id="packages"
      className="flex w-full min-h-screen justify-center items-center px-4 py-20 md:px-8 xl:py-28"
    >
      <div className="flex w-full max-w-[1350px] flex-col gap-12">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-3xl font-extrabold text-white md:text-5xl">
            DISCOVER THE COMFORT OF AN IMPECCABLE HOME WITH OUR PROFESSIONAL
            SERVICES
          </h2>
        </div>

        <div
          className="
            grid grid-cols-1 items-stretch gap-6
            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          {packages.map((packageItem) => (
            <PackageCard key={packageItem.id} packageItem={packageItem} />
          ))}
        </div>
      </div>
    </section>
  );
};

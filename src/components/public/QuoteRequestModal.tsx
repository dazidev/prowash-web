"use client";

import { sendWebQuote } from "@/actions";
import type { CreateWebQuotePayload, PublicPackageService } from "@/interfaces";
import { useEffect, useId, useRef, useState } from "react";
import type { SubmitEvent } from "react";
import { IoCheckmarkCircleOutline, IoClose } from "react-icons/io5";
import { ErrorDialog } from "../common";
import { Spinner } from "../common/loading/Spinner";

export interface PackageQuoteSelection {
  packageId: string;
  packagePriceId: string;
  packageName: string;
  price: number;
  rangeName: string;
  rangeUnit: string;
  services: PublicPackageService[];
}

interface Props {
  selection: PackageQuoteSelection;
  onClose: () => void;
}

const inputClassName =
  "w-full min-w-0 rounded-xl border-2 border-gray-200/20 " +
  "bg-neutral-200 px-4 py-3.5 text-black placeholder-zinc-800 " +
  "outline-none focus:border-gray-200 focus:bg-neutral-100";

export const QuoteRequestModal = ({ selection, onClose }: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const submittingRef = useRef(false);
  const titleId = useId();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    dialog.showModal();

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    if (successMessage) {
      successRef.current?.focus();
    }
  }, [successMessage]);

  const handleClose = () => {
    if (submittingRef.current) return;
    onClose();
  };

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submittingRef.current) return;

    const formData = new FormData(event.currentTarget);

    const getValue = (name: string) => String(formData.get(name) ?? "").trim();

    const payload: CreateWebQuotePayload = {
      name: getValue("name"),
      lastname: getValue("lastname") || undefined,
      email: getValue("email"),
      phone: getValue("phone"),
      zipcode: getValue("zipcode") || undefined,
      comments: getValue("comments"),
      packageId: selection.packageId,
      packagePriceId: selection.packagePriceId,
    };

    submittingRef.current = true;
    setIsSubmitting(true);
    setError("");

    try {
      const response = await sendWebQuote(payload);

      if (!response.success) {
        setError(
          response.message ??
            "Unable to send your quote request. Please try again.",
        );
        return;
      }

      setSuccessMessage(
        response.message ??
          "We have received your quote request. We will contact you shortly.",
      );
    } catch {
      setError("Unable to send your quote request. Please try again.");
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        handleClose();
      }}
      className="
        m-auto max-h-[90dvh] w-[92vw] max-w-2xl
        overflow-y-auto rounded-2xl bg-pblue p-0
        text-white shadow-2xl backdrop:bg-black/60
      "
    >
      <div className="relative p-5 sm:p-8">
        <button
          type="button"
          aria-label="Close quote request"
          disabled={isSubmitting}
          onClick={handleClose}
          className="
            absolute right-3 top-3 rounded-lg p-2
            hover:bg-white/15 focus-visible:outline-2
            focus-visible:outline-white disabled:opacity-50
          "
        >
          <IoClose size={26} />
        </button>

        {successMessage ? (
          <div
            role="status"
            className="flex flex-col items-center gap-5 py-8 text-center"
          >
            <IoCheckmarkCircleOutline
              aria-hidden="true"
              className="text-7xl text-sgreen"
            />

            <h2
              ref={successRef}
              id={titleId}
              tabIndex={-1}
              className="text-3xl font-bold outline-none"
            >
              QUOTE REQUEST RECEIVED
            </h2>

            <p className="text-xl font-semibold text-sgreen">
              {selection.packageName}
            </p>

            <p className="max-w-md text-lg">{successMessage}</p>

            <button
              type="button"
              onClick={handleClose}
              className="
                mt-3 rounded-xl bg-sgreen px-8 py-3
                text-lg font-bold text-black hover:bg-pgreen
              "
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h2
              id={titleId}
              className="mb-6 pr-8 text-center text-3xl font-bold sm:text-4xl"
            >
              GET A QUOTE
            </h2>
            <div className="mb-6 rounded-xl bg-white p-5 text-black">
              <h3 className="text-center text-2xl font-extrabold">
                {selection.packageName}
              </h3>

              <p className="mt-2 text-center text-zinc-600">
                {selection.rangeName} {selection.rangeUnit}
              </p>

              <p className="my-4 text-center">
                <span className="text-3xl font-extrabold">
                  USD {selection.price.toLocaleString("en-US")}
                </span>
                <span className="ml-2 text-zinc-600">/ year</span>
              </p>

              <ul className="flex flex-col gap-3">
                {selection.services.map((service) => (
                  <li
                    key={service.id}
                    className="flex items-center justify-between gap-3"
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <IoCheckmarkCircleOutline
                        aria-hidden="true"
                        className="shrink-0 text-2xl text-pgreen"
                      />
                      <span>{service.name}</span>
                    </span>

                    <span className="shrink-0 rounded-full bg-sgreen px-3 py-1 text-sm font-semibold">
                      {service.amount} x year
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-4 text-center text-xs text-zinc-500">
                * All prices shown are subject to change based on the final
                quote.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              aria-busy={isSubmitting}
              className="flex flex-col gap-5"
            >
              <fieldset
                disabled={isSubmitting}
                className="flex min-w-0 flex-col gap-5 disabled:opacity-70"
              >
                <legend className="sr-only">Contact information</legend>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <input
                    autoFocus
                    aria-label="First name"
                    placeholder="First Name"
                    name="name"
                    type="text"
                    autoComplete="given-name"
                    required
                    maxLength={80}
                    className={inputClassName}
                  />

                  <input
                    aria-label="Last name"
                    placeholder="Last Name"
                    name="lastname"
                    type="text"
                    autoComplete="family-name"
                    required
                    maxLength={80}
                    className={inputClassName}
                  />
                </div>

                <input
                  aria-label="Email"
                  placeholder="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={120}
                  className={inputClassName}
                />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <input
                    aria-label="ZIP code"
                    placeholder="Zip Code"
                    name="zipcode"
                    type="text"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    pattern="[0-9]{5}(-[0-9]{4})?"
                    title="Enter a ZIP code such as 12345 or 12345-6789."
                    maxLength={10}
                    className={inputClassName}
                  />

                  <input
                    aria-label="Phone number"
                    placeholder="Phone Number"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    required
                    pattern="[0-9]{10}"
                    title="Enter a 10-digit phone number."
                    maxLength={10}
                    className={inputClassName}
                  />
                </div>

                <textarea
                  aria-label="Comments"
                  placeholder="Comments"
                  name="comments"
                  required
                  minLength={5}
                  maxLength={200}
                  rows={4}
                  className={inputClassName}
                />

                <button
                  type="submit"
                  className="
                    flex w-full items-center justify-center gap-3
                    rounded-xl bg-sgreen px-6 py-4
                    text-xl font-bold text-black
                    hover:bg-pgreen disabled:cursor-wait
                  "
                >
                  {isSubmitting ? (
                    <>
                      <Spinner size="w-6 h-6" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    "Request a quote"
                  )}
                </button>
              </fieldset>

              {error && (
                <div role="alert">
                  <ErrorDialog error={error} />
                </div>
              )}
            </form>
          </>
        )}
      </div>
    </dialog>
  );
};

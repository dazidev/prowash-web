"use client";
import {
  assignUserQuoteAppointment,
  setUserQuoteFinalPrice,
  updateUserQuoteStatus,
} from "@/actions";
import type {
  ActionResponse,
  PackageOrderPurchaseStatus,
  PackageOrderQuote,
} from "@/interfaces";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import type { SubmitEvent } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { ErrorDialog } from "../../common";
import { Spinner } from "../../common/loading/Spinner";
import {
  appQuoteStatuses,
  appQuoteStatusStyles,
} from "../quotes/app-quote-status";
import { formatInTimeZone, fromZonedTime } from "date-fns-tz";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  value: PackageOrderQuote;
}

interface DetailsProps {
  quote: PackageOrderQuote;
  onClose: () => void;
}

const APPOINTMENT_TIME_ZONE = "America/New_York";

const statusTransitions: Record<
  PackageOrderPurchaseStatus,
  PackageOrderPurchaseStatus[]
> = {
  PENDING_REVIEW: ["PENDING_REVIEW", "ASSIGNED_APPOINTMENT", "CANCELLED"],
  ASSIGNED_APPOINTMENT: ["ASSIGNED_APPOINTMENT", "QUOTED", "CANCELLED"],
  APPOINTMENT_RESCHEDULE_REQUESTED: [
    "APPOINTMENT_RESCHEDULE_REQUESTED",
    "ASSIGNED_APPOINTMENT",
    "CANCELLED",
  ],
  QUOTED: ["QUOTED", "PAID", "CANCELLED"],
  PAID: ["PAID"],
  CANCELLED: ["CANCELLED"],
};

function formatAppointment(
  date: string | null,
  timeZone: string | null,
  pattern: string,
): string {
  if (!date || !timeZone) return "";

  try {
    return formatInTimeZone(date, timeZone, pattern);
  } catch {
    return "";
  }
}

export const QuoteViewModal = ({ open, setOpen, value }: Props) => {
  if (!open) return null;

  return (
    <AppQuoteDetails
      key={`${value.id}:${value.updatedAt}`}
      quote={value}
      onClose={() => setOpen(false)}
    />
  );
};

const AppQuoteDetails = ({ quote, onClose }: DetailsProps) => {
  const router = useRouter();
  const titleId = useId();
  const statusId = useId();

  const dialogRef = useRef<HTMLDialogElement>(null);
  const submittingRef = useRef(false);

  const [selectedStatus, setSelectedStatus] =
    useState<PackageOrderPurchaseStatus>(quote.purchaseStatus);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const appointmentId = useId();
  const finalPriceId = useId();

  const initialAppointmentLocal = formatAppointment(
    quote.appointmentAt,
    APPOINTMENT_TIME_ZONE,
    "yyyy-MM-dd'T'HH:mm:ss",
  );

  const initialFinalPrice = quote.finalPrice?.toString() ?? "";

  const [appointmentLocal, setAppointmentLocal] = useState(
    initialAppointmentLocal,
  );

  const [finalPriceInput, setFinalPriceInput] = useState(initialFinalPrice);
  const [editingAppointment, setEditingAppointment] = useState(
    quote.purchaseStatus === "APPOINTMENT_RESCHEDULE_REQUESTED",
  );

  const showAppointmentFields =
    editingAppointment || selectedStatus === "ASSIGNED_APPOINTMENT";

  const showFinalPriceField =
    !showAppointmentFields && selectedStatus === "QUOTED";

  const appointmentChanged = appointmentLocal !== initialAppointmentLocal;

  const hasChanges = showAppointmentFields
    ? appointmentChanged || quote.purchaseStatus === "PENDING_REVIEW"
    : showFinalPriceField
      ? finalPriceInput !== initialFinalPrice ||
        selectedStatus !== quote.purchaseStatus
      : selectedStatus !== quote.purchaseStatus;

  const missingFields =
    (showAppointmentFields && !appointmentLocal) ||
    (showFinalPriceField && !finalPriceInput.trim());

  const statusOptions = appQuoteStatuses.filter(({ value }) =>
    statusTransitions[quote.purchaseStatus].includes(value),
  );

  const saveLabel = showAppointmentFields
    ? "Save appointment"
    : showFinalPriceField
      ? "Save final price"
      : "Save status";

  const currentStatusLabel = appQuoteStatuses.find(
    (status) => status.value === quote.purchaseStatus,
  )?.label;

  const userFields = [
    ["Name", `${quote.user.name} ${quote.user.lastname}`.trim()],
    ["Email", quote.user.email],
    ["Phone", quote.user.phoneNumber || "—"],
  ] as const;

  const houseFields = [
    ["Name", quote.userHouse.name],
    ["Street", quote.userHouse.street],
    ["Complement Street", quote.userHouse.complementStreet || "—"],
    ["City", quote.userHouse.city],
    ["State", quote.userHouse.state],
    ["ZIP Code", quote.userHouse.zipcode],
  ] as const;

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

  const handleClose = () => {
    if (submittingRef.current) return;
    onClose();
  };

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submittingRef.current || !hasChanges) return;

    submittingRef.current = true;
    setIsSubmitting(true);
    setError("");

    let saved = false;

    try {
      let response: ActionResponse<unknown>;

      if (showAppointmentFields) {
        if (!appointmentLocal) {
          throw new Error("Select the appointment date and time.");
        }

        const localValue =
          appointmentLocal.length === 16
            ? `${appointmentLocal}:00`
            : appointmentLocal;

        const appointmentDate = fromZonedTime(
          localValue,
          APPOINTMENT_TIME_ZONE,
        );

        if (
          Number.isNaN(appointmentDate.getTime()) ||
          formatInTimeZone(
            appointmentDate,
            APPOINTMENT_TIME_ZONE,
            "yyyy-MM-dd'T'HH:mm:ss",
          ) !== localValue
        ) {
          throw new Error(
            "The selected date or time is invalid in South Carolina.",
          );
        }

        if (
          quote.purchaseStatus === "APPOINTMENT_RESCHEDULE_REQUESTED" &&
          quote.appointmentAt &&
          appointmentDate.getTime() === new Date(quote.appointmentAt).getTime()
        ) {
          throw new Error(
            "Select a different date or time to resolve the reschedule request.",
          );
        }

        response = await assignUserQuoteAppointment(quote.id, {
          appointmentAt: appointmentDate.toISOString(),
          expectedAppointmentVersion: quote.appointmentVersion,
        });
      } else if (showFinalPriceField) {
        const finalPrice = Number(finalPriceInput);

        if (
          !finalPriceInput.trim() ||
          !Number.isSafeInteger(finalPrice) ||
          finalPrice < 0 ||
          finalPrice > 2147483647
        ) {
          throw new Error("Enter a valid final price in whole dollars.");
        }

        response = await setUserQuoteFinalPrice(quote.id, {
          finalPrice,
          expectedAppointmentVersion: quote.appointmentVersion,
          expectedFinalPrice: quote.finalPrice,
        });
      } else {
        response = await updateUserQuoteStatus(quote.id, selectedStatus);
      }

      if (!response.success) {
        setError(response.message ?? "Unable to save the quote.");
        return;
      }

      toast.success(response.message ?? "Quote saved successfully.");
      saved = true;
    } catch (error: unknown) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to save the quote. Please try again.",
      );
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }

    if (saved) {
      onClose();
      router.refresh();
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
        m-auto max-h-[90dvh] w-[92vw] max-w-3xl
        overflow-y-auto rounded-2xl bg-white p-0
        text-gray-900 shadow-2xl backdrop:bg-black/60
      "
    >
      <div className="flex items-start justify-between gap-4 border-b border-gray-200 p-5 sm:p-6">
        <div>
          <h2 id={titleId} className="text-xl font-bold">
            APP QUOTE INFORMATION
          </h2>

          <div className="mt-3 flex flex-wrap gap-2 text-sm">
            <span
              className={`
                rounded-full px-3 py-1
                ${appQuoteStatusStyles[quote.purchaseStatus]}
              `}
            >
              {currentStatusLabel}
            </span>

            <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-600">
              Requested: {quote.createdAt.slice(0, 10)}
            </span>

            <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-600">
              Updated: {quote.updatedAt.slice(0, 10)}
            </span>
          </div>
        </div>

        <button
          autoFocus
          type="button"
          aria-label="Close app quote details"
          disabled={isSubmitting}
          onClick={handleClose}
          className="
            shrink-0 rounded-lg p-2 text-gray-500
            hover:bg-gray-100 hover:text-black
            disabled:opacity-50
          "
        >
          <IoClose aria-hidden="true" size={24} />
        </button>
      </div>

      <div className="flex flex-col gap-6 p-5 sm:p-6">
        <section>
          <h3 className="mb-4 font-bold">USER INFORMATION</h3>

          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {userFields.map(([label, value]) => (
              <div key={label} className="min-w-0 rounded-lg bg-gray-50 p-3">
                <dt className="mb-1 text-sm text-gray-500">{label}</dt>

                <dd className="break-words font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h3 className="mb-4 font-bold">HOUSE INFORMATION</h3>

          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {houseFields.map(([label, value]) => (
              <div key={label} className="min-w-0 rounded-lg bg-gray-50 p-3">
                <dt className="mb-1 text-sm text-gray-500">{label}</dt>

                <dd className="break-words font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="rounded-xl border border-gray-200 p-4">
          <h3 className="mb-4 font-bold">PACKAGE INTEREST</h3>

          <p className="break-words text-2xl font-extrabold">{quote.name}</p>

          <p className="mt-2 text-gray-600">
            Up to {quote.range.toLocaleString("en-US")} ft²
          </p>

          <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="mb-1 text-sm text-gray-500">Initial price</dt>

              <dd className="text-xl font-semibold">
                USD {quote.initialPrice.toLocaleString("en-US")}
                <span className="ml-2 text-base font-normal text-gray-500">
                  / year
                </span>
              </dd>
            </div>

            <div>
              <dt className="mb-1 text-sm text-gray-500">Final price</dt>

              <dd className="text-xl font-semibold">
                {quote.finalPrice === null ? (
                  <span className="text-base font-normal text-gray-500">
                    Not set
                  </span>
                ) : (
                  <>
                    USD {quote.finalPrice.toLocaleString("en-US")}
                    <span className="ml-2 text-base font-normal text-gray-500">
                      / year
                    </span>
                  </>
                )}
              </dd>
            </div>
          </dl>

          <h4 className="mb-3 mt-5 text-sm font-semibold text-gray-500">
            SERVICES INCLUDED
          </h4>

          <ul className="flex flex-col gap-3">
            {quote.services.map((service) => (
              <li
                key={service.name}
                className="flex items-start justify-between gap-4"
              >
                <span className="break-words">{service.name}</span>

                <span className="shrink-0 rounded-full bg-sgreen px-3 py-1 text-sm font-semibold">
                  {service.quantity} x year
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-gray-200 p-4">
          <h3 className="mb-4 font-bold">VISIT APPOINTMENT</h3>

          <p className="font-semibold">
            {formatAppointment(
              quote.appointmentAt,
              APPOINTMENT_TIME_ZONE,
              "MMM d, yyyy 'at' HH:mm zzz",
            ) || "No appointment assigned yet"}
          </p>

          {quote.appointmentAt && (
            <p className="mt-1 text-sm text-gray-500">South Carolina time.</p>
          )}

          {quote.appointmentAt && (
            <p className="mt-3 text-sm">
              {quote.purchaseStatus === "CANCELLED"
                ? "Quote cancelled"
                : quote.purchaseStatus === "APPOINTMENT_RESCHEDULE_REQUESTED"
                  ? "The customer requested a different date."
                  : quote.appointmentAcceptedAt
                    ? "Appointment confirmed by the customer."
                    : "Waiting for the customer's confirmation."}
            </p>
          )}

          {quote.appointmentAt &&
            (quote.purchaseStatus === "QUOTED" ||
              quote.purchaseStatus === "PAID") && (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => {
                  setEditingAppointment((previous) => !previous);
                  setSelectedStatus(quote.purchaseStatus);
                  setError("");
                }}
                className="
                  mt-4 rounded-lg border border-blue-200 px-4 py-2
                  font-semibold text-pblue hover:bg-blue-50
                  disabled:opacity-50
                "
              >
                {editingAppointment
                  ? "Cancel appointment editing"
                  : "Modify appointment"}
              </button>
            )}
        </section>

        <form
          onSubmit={handleSubmit}
          aria-busy={isSubmitting}
          className="border-t border-gray-200 pt-5"
        >
          <fieldset disabled={isSubmitting} className="flex flex-col gap-4">
            <legend className="mb-3 font-bold">UPDATE QUOTE</legend>

            <label htmlFor={statusId} className="sr-only">
              Quote status
            </label>

            <select
              id={statusId}
              value={selectedStatus}
              onChange={(event) => {
                setSelectedStatus(
                  event.target.value as PackageOrderPurchaseStatus,
                );
                setEditingAppointment(false);
                setError("");
              }}
              className="
                rounded-lg border border-gray-300 bg-white
                px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500
              "
            >
              {statusOptions.map((status) => (
                <option
                  key={status.value}
                  value={status.value}
                  disabled={status.value === "APPOINTMENT_RESCHEDULE_REQUESTED"}
                >
                  {status.label}
                </option>
              ))}
            </select>

            {showAppointmentFields && (
              <div className="rounded-xl bg-blue-50 p-4">
                <label
                  htmlFor={appointmentId}
                  className="mb-2 block text-sm font-semibold"
                >
                  Visit date and time
                </label>

                <input
                  id={appointmentId}
                  type="datetime-local"
                  step={1}
                  required
                  value={appointmentLocal}
                  onChange={(event) => {
                    setAppointmentLocal(event.target.value);
                    setError("");
                  }}
                  className="
                    w-full rounded-lg border border-gray-300 bg-white
                    px-3 py-3 outline-none focus:ring-2 focus:ring-blue-500
                  "
                />

                <p className="mt-2 text-sm text-gray-600">
                  South Carolina time.
                </p>
              </div>
            )}

            {showFinalPriceField && (
              <div className="rounded-xl bg-purple-50 p-4">
                <label
                  htmlFor={finalPriceId}
                  className="mb-2 block text-sm font-semibold"
                >
                  Final price — USD / year
                </label>

                <input
                  id={finalPriceId}
                  type="number"
                  min={0}
                  max={2147483647}
                  step={1}
                  required
                  value={finalPriceInput}
                  onChange={(event) => {
                    setFinalPriceInput(event.target.value);
                    setError("");
                  }}
                  className="
                    w-full rounded-lg border border-gray-300 bg-white
                    px-3 py-3 outline-none focus:ring-2 focus:ring-purple-500
                  "
                />
              </div>
            )}

            <div className="flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="rounded-lg border border-gray-300 px-5 py-3 hover:bg-gray-50"
              >
                Close
              </button>

              <button
                type="submit"
                disabled={isSubmitting || !hasChanges || missingFields}
                className="
                  flex items-center justify-center gap-2
                  rounded-lg bg-pblue px-5 py-3
                  font-semibold text-white hover:brightness-110
                  disabled:cursor-not-allowed disabled:opacity-50
                "
              >
                {isSubmitting ? (
                  <>
                    <Spinner size="w-5 h-5" />
                    <span>Saving...</span>
                  </>
                ) : (
                  saveLabel
                )}
              </button>
            </div>
          </fieldset>

          {error && (
            <div role="alert" className="mt-4">
              <ErrorDialog error={error} />
            </div>
          )}
        </form>
      </div>
    </dialog>
  );
};

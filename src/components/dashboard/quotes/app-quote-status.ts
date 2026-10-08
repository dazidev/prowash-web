import type { PackageOrderPurchaseStatus } from "@/interfaces";

export const appQuoteStatuses: {
  value: PackageOrderPurchaseStatus;
  label: string;
}[] = [
  {
    value: "PENDING_REVIEW",
    label: "Pending review",
  },
  {
    value: "ASSIGNED_APPOINTMENT",
    label: "Assigned appointment",
  },
  {
    value: "APPOINTMENT_RESCHEDULE_REQUESTED",
    label: "Reschedule requested",
  },
  {
    value: "QUOTED",
    label: "Quoted",
  },
  {
    value: "PAID",
    label: "Paid",
  },
  {
    value: "CANCELLED",
    label: "Cancelled",
  },
];

export const appQuoteStatusStyles: Record<PackageOrderPurchaseStatus, string> =
  {
    PENDING_REVIEW: "bg-yellow-100 text-yellow-800",
    ASSIGNED_APPOINTMENT: "bg-blue-100 text-blue-800",
    APPOINTMENT_RESCHEDULE_REQUESTED: "bg-orange-100 text-orange-800",
    QUOTED: "bg-purple-100 text-purple-800",
    PAID: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
  };

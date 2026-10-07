import type { PackageOrderQuote } from "@/interfaces";
import {
  appQuoteStatuses,
  appQuoteStatusStyles,
} from "../../quotes/app-quote-status";

interface Props {
  quotes: PackageOrderQuote;
}

export const ItemQuote = ({ quotes }: Props) => {
  const { name, user, purchaseStatus, createdAt } = quotes;

  const statusLabel = appQuoteStatuses.find(
    (status) => status.value === purchaseStatus,
  )?.label;

  return (
    <>
      <th
        scope="row"
        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
      >
        <span className="font-semibold text-slate-900">{name}</span>
      </th>

      <td className="px-6 py-4">
        <span className="text-black">{user.email}</span>
      </td>

      <td className="px-6 py-4">
        <span className="text-black">{user.phoneNumber || "—"}</span>
      </td>

      <td className="whitespace-nowrap px-6 py-4">
        <span className="text-black">{createdAt.slice(0, 10)}</span>
      </td>

      <td className="px-6 py-4">
        <span
          className={`
            inline-flex items-center whitespace-nowrap
            rounded-full px-3 py-1.5 text-xs font-semibold
            ${appQuoteStatusStyles[purchaseStatus]}
          `}
        >
          {statusLabel}
        </span>
      </td>
    </>
  );
};

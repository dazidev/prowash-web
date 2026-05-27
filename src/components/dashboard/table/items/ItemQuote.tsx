import { PackageOrderQuote } from "@/interfaces";

interface Props {
  quotes: PackageOrderQuote;
}

export const ItemQuote = ({ quotes }: Props) => {
  const { name, user, purchaseStatus, createdAt } = quotes;

  return (
    <>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
      >
        <span className="font-semibold text-slate-900">{name}</span>
      </th>
      <td className="px-6 py-4">
        <span className="text-black"> {user.email} </span>
      </td>
      <td className="px-6 py-4">
        <span className="text-black"> {user.phoneNumber} </span>
      </td>
      <td className="px-6 py-4">
        <span className="text-black">
          {" "}
          {createdAt.toString().slice(0, 10)}{" "}
        </span>
      </td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold
          ${purchaseStatus === "PENDING_REVIEW" ? "bg-red-300 text-red-900" : "bg-green-300 text-green-900"} `}
        >
          {purchaseStatus.replace("_", " ")}
        </span>
      </td>
    </>
  );
};

import { Contact } from "@/interfaces";

interface Props {
  contact: Contact;
}

export const ItemContact = ({ contact }: Props) => {
  const { name, lastname, email, phone, status, createdAt } = contact;

  const fullname = `${name} ${lastname === null ? "" : lastname}`;

  return (
    <>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
      >
        <span className="font-semibold text-slate-900">{fullname}</span>
      </th>
      <td className="px-6 py-4">
        <span className="text-black"> {email} </span>
      </td>
      <td className="px-6 py-4">
        <span className="text-black"> {phone} </span>
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
          ${status === "ATTENDED" ? "bg-green-300 text-green-900" : "bg-red-300 text-red-900"} `}
        >
          {status.replace("_", " ")}
        </span>
      </td>
    </>
  );
};

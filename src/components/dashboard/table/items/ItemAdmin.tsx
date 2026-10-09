import { User } from "@/interfaces";

interface Props {
  admin: User;
}

export const ItemAdmin = ({ admin }: Props) => {
  const { name, lastname, email, roles, lastLogin } = admin;

  const initialNameLetters = `${name.slice(0, 1).toUpperCase()}${lastname
    .slice(0, 1)
    .toUpperCase()}`;
  const fullName = `${name} ${lastname}`;
  const formatRole = roles[0];

  return (
    <>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
            {initialNameLetters}
          </div>
          <span className="font-semibold text-slate-900">{fullName}</span>
        </div>
      </th>
      <td className="px-6 py-4">
        <span className="text-black"> {email} </span>
      </td>
      <td className="px-6 py-4">
        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
          {formatRole}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
          Active
        </span>
      </td>
      <td className="px-6 py-4">{lastLogin}</td>
    </>
  );
};

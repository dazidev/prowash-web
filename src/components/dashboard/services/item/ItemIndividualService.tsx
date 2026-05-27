interface Props {
  id: string;
  initialPrice: number;
  name: string;
}

export const ItemIndividualService = ({ id, initialPrice, name }: Props) => {
  return (
    <tr className="bg-white border-b  border-gray-200 hover:bg-gray-50">
      <th className="px-6 py-4">
        <span className="text-black"> {name} </span>
      </th>
      <td className="px-6 py-4">
        <span className="text-black"> {initialPrice} </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-md border border-slate-200 hover:border-red-500 hover:bg-red-50 hover:text-red-600 text-slate-500 flex items-center justify-center transition-all">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M2 4h12M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1M13 4v9a1 1 0 01-1 1H4a1 1 0 01-1-1V4" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
};

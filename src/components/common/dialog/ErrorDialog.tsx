import { FaExclamationTriangle } from "react-icons/fa";

interface Props {
  error: string;
}

export const ErrorDialog = ({ error }: Props) => {
  return (
    <div className="flex flex-row bg-red-400/80 py-2 px-3 gap-3">
      <div className="w-auto">
        <FaExclamationTriangle className=" text-red-100" size={24} />
      </div>
      <span className=" text-red-100">{error}</span>
    </div>
  );
};

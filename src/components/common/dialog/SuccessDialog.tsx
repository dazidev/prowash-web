import { FaCheckCircle } from "react-icons/fa";

interface Props {
  message: string;
}

export const SuccessDialog = ({ message }: Props) => {
  return (
    <div className="flex flex-row bg-pgreen py-2 px-3 gap-3">
      <div className="w-auto">
        <FaCheckCircle className=" text-white" size={24} />
      </div>
      <span className=" text-red-100 text-left">{message}</span>
    </div>
  );
};

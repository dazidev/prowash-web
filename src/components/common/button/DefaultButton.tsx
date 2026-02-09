import { Spinner } from "../loading/Spinner";

interface Props {
  name: string;
  onClick?: () => void;
  style?: string;
  size?: string;
  loading: boolean;
  type?: "button" | "submit" | "reset" | undefined;
}

export const DefaultButton = ({
  name,
  onClick,
  style = "bg-pblue hover:brightness-110",
  size,
  loading,
  type = "button",
}: Props) => {
  return (
    <div className={`${size}`}>
      <button
        type={type}
        onClick={onClick}
        disabled={loading}
        className={`
          w-full h-12 rounded-xl px-5 py-3 text-white font-bold focus:outline-none
          ${
            loading
              ? "cursor-not-allowed"
              : "hover:cursor-pointer active:scale-98"
          }
          ${style}
        `}
      >
        {loading ? <Spinner /> : name}
      </button>
    </div>
  );
};

import { FaStar } from "react-icons/fa";
import ReadMore from "../common/read-more/ReadMore";

interface Props {
  stars: number;
  name: string;
  comment: string;
}

export const ReviewCard = ({ stars, name, comment }: Props) => {
  const numStars = Array.from({ length: stars }, (v, i) => i + 1);

  return (
    <div className="flex flex-col w-full md:max-w-100 p-5 bg-white rounded-2xl text-center">
      <div className="flex-10">
        <ReadMore text={comment} maxLength={150} />
      </div>

      <div className="flex-2">
        <p className="text-2xl font-bold text-black mt-3">{name}</p>
        <div className="flex flex-row justify-center gap-1">
          {numStars.map((start) => (
            <FaStar
              key={start}
              height={50}
              width={50}
              className="text-amber-300"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

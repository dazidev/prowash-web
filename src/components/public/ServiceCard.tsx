import Image from "next/image";

interface Props {
  image: string;
  title: string;
}

export const ServiceCard = ({ image, title }: Props) => {
  const alt = title.replace(" ", "-") + "-image";
  return (
    <div className="flex flex-col w-[300px] h-[400px]">
      <div className="relative w-full h-[300px]">
        <Image
          src={image}
          fill
          alt={alt}
          className="object-cover rounded-2xl"
        />
      </div>

      <div className="w-full h-[100px] flex items-center justify-center">
        <h3 className="text-3xl font-normal">{title.toUpperCase()}</h3>
      </div>
    </div>
  );
};

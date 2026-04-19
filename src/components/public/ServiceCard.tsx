import Image from "next/image";

interface Props {
  image: string;
  title: string;
}

export const ServiceCard = ({ image, title }: Props) => {
  const alt = title.replace(" ", "-") + "-image";
  return (
    <div className="flex flex-col w-[300px] h-[400px] border border-pgreen bg-white/80 rounded-2xl">
      <div className="relative w-full h-[300px]">
        <Image
          src={image}
          fill
          alt={alt}
          className="object-cover rounded-2xl"
        />
      </div>

      <div className="w-full h-[100px] flex items-center justify-center px-5">
        <h3 className="text-3xl font-normal text-black">
          {title.toUpperCase()}
        </h3>
      </div>
    </div>
  );
};

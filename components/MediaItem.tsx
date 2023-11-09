"use client";

import useLoadImages from "@/hooks/useLoadImages";
import { Song } from "@/types";
import Image from "next/image";

interface MediaItemProps {
  data: Song;
  onClick?: (id: string) => void;
}
const MediaItem: React.FC<MediaItemProps> = ({ data, onClick }) => {
  const imageUrl = useLoadImages(data);
  const handleClick = () => {
    if (onClick) {
      onClick(data.id);
    }
  };
  return (
    <div
      onClick={handleClick}
      className="
        flex
        items-center
        gap-x-3
        cursor-pointer
        hover:bg-neutral-800/50
        w-full
        p-2
        rounded-md
    "
    >
      <div
        className="
        relative
        rounded-md
        w-[60px]
        h-[60px]
        overflow-hidden

      "
      >
        <Image
          priority
          decoding="async"
          fetchPriority="high"
          quality={75}
          fill
          sizes="100%"
          src={imageUrl || ""}
          alt="Image"
          className="object-cover"
        ></Image>
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white truncate">{data.title}</p>
        <p className="text-neutral-400 text-sm truncate">By {data.author}</p>
      </div>
    </div>
  );
};
export default MediaItem;

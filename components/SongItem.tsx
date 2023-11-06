"use client";

import useLoadImages from "@/hooks/useLoadImages";
import { Song } from "@/types";
import Image from "next/image";
import PlayButton from "./PlayButton";

interface SongItemProps {
  data: Song;
  onClick: (id: string) => void;
}
const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
  const imagesPath = useLoadImages(data);
  return (
    <div
      onClick={() => onClick(data.id)}
      className="
    relative
    group
    flex
    flex-col
    items-center
    justify-center
    rounded-md
    overflow-hidden
    gap-x-2
    bg-neutral-400/5
    cursor-pointer
    hover:bg-neutral-400/10
    transition
    p-3
  "
    >
      <div
        className="
        relative
        aspect-square
        w-full
        h-full
        rounded-md
        overflow-hidden
       "
      >
        <Image
          className="object-cover"
          src={imagesPath || ""}
          fill
          alt="Image Song"
        />
      </div>
      <div className="flex flex-col items-start w-full p-4 gap-y-1">
        <p className="font-semibold truncate w-full">{data.title}</p>
        <p className="text-neutral-400 text-sm pb-4 w-full truncate">
          By {data.author}
        </p>
        <div className="absolute bottom-24 right-5">
          <PlayButton />
        </div>
      </div>
    </div>
  );
};
export default SongItem;

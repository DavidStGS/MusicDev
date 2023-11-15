"use client";

import MediaItem from "@/components/MediaItem";
import { Song } from "@/types";
import useOnPlay from "@/hooks/useOnPLay";
import LikeButton from "@/components/LikeButton";

interface SearchSongsProps {
  songs: Song[];
}
const SearchSongs: React.FC<SearchSongsProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return (
      <div
        className="
                ml-6
                flex
                flex-col
                w-full
                text-neutral-400
                text-1xl
            "
      >
        No songs found.
      </div>
    );
  }
  return (
    <div
      className="
      flex 
      flex-col 
      w-full
      px-5
    "
    >
      {songs.map((song) => (
        <div
          key={song.id}
          className="
            flex
            items-center
            gap-x-10
            w-full
        "
        >
          <div className="flex-1">
            <MediaItem onClick={(id: string) => onPlay(id)} data={song} />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};
export default SearchSongs;

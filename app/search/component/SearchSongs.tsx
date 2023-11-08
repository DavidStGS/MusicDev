"use client";

import MediaItem from "@/components/MediaItem";
import { Song } from "@/types";
import useOnPlay from "@/hooks/useOnPLay";

interface SearchSongsProps {
  songs: Song[];
}
const SearchSongs: React.FC<SearchSongsProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return (
      <div
        className="
                flex
                flex-col
                w-full
                text-neutral-400
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
      px-4
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
        </div>
      ))}
    </div>
  );
};
export default SearchSongs;

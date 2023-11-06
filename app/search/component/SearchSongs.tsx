"use client";

import MediaItem from "@/components/MediaItem";
import { Song } from "@/types";

interface SearchSongsProps {
  songs: Song[];
}
const SearchSongs: React.FC<SearchSongsProps> = ({ songs }) => {
  if (songs.length === 0) {
    return (
      <div
        className="
                flex
                flex-col
                py-40
                w-full
                px-6
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
      py-40
      w-full
      px-6
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
            <MediaItem onClick={() => {}} data={song} />
          </div>
        </div>
      ))}
    </div>
  );
};
export default SearchSongs;

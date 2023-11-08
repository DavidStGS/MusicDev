"use client";

import usePlayer from "@/hooks/usePlayer";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import useGetSongById from "@/hooks/useGetSongsById";
import PlayerContent from "./PlayerContent";

const Player = () => {
  const player = usePlayer();
  const { songs } = useGetSongById(player.activedId);

  const songUrl = useLoadSongUrl(songs!);

  if (!songs || !songUrl || !player.activedId) {
    return null;
  }

  return (
    <div
      className="
        fixed 
        bottom-0 
        bg-zinc-950
        w-full
        h-[80px] 
        px-3

      "
    >
      <PlayerContent key={songUrl} song={songs} songUrl={songUrl} />
    </div>
  );
};

export default Player;

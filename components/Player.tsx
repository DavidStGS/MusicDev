"use client";

import getSongsByUserId from "@/hooks/useGetSongsById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";
import PlayerContent from "./PlayerContent";

const Player = () => {
  const play = usePlayer();
  const { songs } = getSongsByUserId(play.activateId);

  const songUrl = useLoadSongUrl(songs!);

  if (!songs || !songUrl || !play.activateId) return null;

  const handlePlay = () => {};
  return (
    <div
      className="
        fixed
        bottom-0
        bg-black
        w-full
        py-2
        h-[80px]
        px-4
    "
    >
      <PlayerContent key={songUrl} song={songs} songUrl={songUrl} />
    </div>
  );
};
export default Player;

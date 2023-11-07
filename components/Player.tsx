"use client";

import getSongsByUserId from "@/hooks/useGetSongsById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";

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
      <div>Hola Soy un reproducer</div>
    </div>
  );
};
export default Player;

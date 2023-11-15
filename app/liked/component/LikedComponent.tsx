"use client";

import { useUser } from "@/hooks/useUsers";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Song } from "@/types";
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";
import useOnPlay from "@/hooks/useOnPLay";

interface LikedComponentProps {
  songs: Song[];
}

const LikedComponent: React.FC<LikedComponentProps> = ({ songs }) => {
  const router = useRouter();
  const { isLoading, user } = useUser();
  const onPlay = useOnPlay(songs);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  if (songs.length === 0) {
    return (
      <div
        className="
            flex
            flex-col
            gap-y-2
            w-full
            px-6
            text-neutral-400
        "
      >
        No liked Songs
      </div>
    );
  }

  return (
    <div
      className="
        flex
        flex-col
        gap-y-2
        w-full
        p-6
    "
    >
      {" "}
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
export default LikedComponent;

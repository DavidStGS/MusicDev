"use client";

import useSound from "use-sound";
import { useEffect, useState } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";

import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";

import MediaItem from "./MediaItem";
import Slider from "./Slider";
import ProgressBar from "./ProgressBar";
import { set } from "react-hook-form";
import SongProgress from "./TimeProgress";
import TimeSet from "./TimeSet";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activedId);
    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activedId);
    const previousSong = player.ids[currentIndex - 1];

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
  };

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    isPlaying: isPlaying,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  useEffect(() => {
    if (sound) {
      const interval = setInterval(() => {
        setProgress(sound.seek() / sound.duration());
      });

      return () => {
        clearInterval(interval);
      };
    }
  }, [sound]);

  useEffect(() => {
    if (sound) {
      // Actualiza currentTime cada segundo
      const interval = setInterval(() => {
        setCurrentTime(sound.seek());
      });

      // Establece la duración de la canción
      setDuration(sound.duration());

      // Limpia el intervalo cuando el componente se desmonta o sound cambia
      return () => {
        clearInterval(interval);
      };
    }
  }, [sound]);

  const handleProgressChange = (newValue) => {
    const newCurrentTime = newValue * duration;
    sound.seek(newCurrentTime);
  };
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="absolute md:flex w-full mt-11 justify-center">
        <SongProgress sound={sound} />
        <div
          className=" 
          hidden
          md:flex
          md:mt-1     
          justify-between 
          items-center     
          w-4/12
          mx-1
          "
        >
          <ProgressBar value={progress} onChange={handleProgressChange} />
        </div>
        <TimeSet sound={sound} />
      </div>
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
        </div>
      </div>
      <div
        className="
            flex 
            md:hidden 
            col-auto 
            w-full 
            justify-end 
            items-center
          "
      >
        <div
          onClick={handlePlay}
          className="
              h-10
              w-10
              flex 
              items-center 
              justify-center 
              rounded-full 
              bg-white 
              p-1 
              cursor-pointer
            "
        >
          <Icon size={20} className="text-black" />
        </div>
      </div>

      <div
        className="
            pt-2
            hidden
            h-full
            md:flex 
            justify-center 
            items-top 
            w-full 
            max-w-[722px] 
            gap-x-5
          "
      >
        <div className="mt-1">
          <AiFillStepBackward
            onClick={onPlayPrevious}
            size={25}
            className="
              text-neutral-400 
              cursor-pointer 
              hover:text-white 
              transition
              
            "
          />
        </div>
        <div
          onClick={handlePlay}
          className="         
              flex 
              items-center 
              justify-center
              h-8
              w-8 
              rounded-full 
              bg-white 
              p-1 
              cursor-pointer
            "
        >
          <Icon size={25} className="text-black" />
        </div>
        <div className="mt-1">
          <AiFillStepForward
            onClick={onPlayNext}
            size={25}
            className="
              text-neutral-400 
              cursor-pointer 
              hover:text-white 
              transition
            "
          />
        </div>
      </div>

      <div className="hidden md:flex w-full justify-end pr-4">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            className="cursor-pointer"
            size={28}
          />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;

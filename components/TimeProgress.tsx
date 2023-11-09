import React, { useState, useEffect } from "react";

const SongProgress = ({ sound }) => {
  const [currentTime, setCurrentTime] = useState(0);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    if (sound) {
      // Actualiza currentTime cada segundo
      const interval = setInterval(() => {
        setCurrentTime(sound.seek());
      });

      // Limpia el intervalo cuando el componente se desmonta o sound cambia
      return () => {
        clearInterval(interval);
      };
    }
  }, [sound]);

  return (
    <div className="flex items-center justify-center text-xs font-extralight w-[32px] mt-1">
      {formatTime(currentTime)}
    </div>
  );
};

export default SongProgress;

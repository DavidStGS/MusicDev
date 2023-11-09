import React, { useState, useEffect } from "react";

const TimeSet = ({ sound }) => {
  const [duration, setDuration] = useState(0);

  const formatTime = (time) => {
    if (isNaN(time)) {
      return ""; // o cualquier otro valor por defecto que quieras
    }

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    if (sound) {
      setDuration(sound.duration());
    }
  }, [sound]);

  return (
    <div className="flex items-center justify-center text-xs font-extralight w-[32px] mt-1">
      {formatTime(duration)}
    </div>
  );
};

export default TimeSet;

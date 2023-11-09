"use client";
// se movio onMouseEnter={() => setIsTrackActive(true)}
// onMouseLeave={() => setIsTrackActive(false)}

import * as RadixSlider from "@radix-ui/react-slider";
import { useState } from "react";

interface SlideProps {
  value?: number;
  onChange?: (value: number) => void;
}

const ProgressBar: React.FC<SlideProps> = ({ value = 0, onChange }) => {
  const [isTrackActive, setIsTrackActive] = useState(false);
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };
  const handleWrapperClick = (event) => {
    const clickPositionInPage = event.pageX;
    const wrapper = event.currentTarget;
    const wrapperStart = wrapper.getBoundingClientRect().left + window.scrollX;
    const wrapperWidth = wrapper.offsetWidth;
    const clickPositionInWrapper = clickPositionInPage - wrapperStart;
    const timePerPixel = 1 / wrapperWidth;
    const clickPositionInTime = timePerPixel * clickPositionInWrapper;

    handleChange([clickPositionInTime]);
  };
  return (
    <div
      className="relative flex items-center w-full h-4 cursor-pointer"
      onClick={handleWrapperClick}
      onMouseEnter={() => setIsTrackActive(true)}
      onMouseLeave={() => setIsTrackActive(false)}
    >
      <RadixSlider.Root
        className="
      absolute 
      top-1/2 
      transform 
      -translate-y-1/2
      flex 
      items-center 
      select-none 
      touch-none 
      w-full 
      h-1
      cursor-pointer
      focus:outline-none
      "
        defaultValue={[0]}
        value={[value]}
        onValueChange={handleChange}
        max={1}
        step={0.01}
        aria-label="Progress"
      >
        <RadixSlider.Track
          className="
        bg-zinc-700
          relative 
          grow 
          rounded-full 
          h-full
        "
        >
          <RadixSlider.Range
            className={`
            absolute 
            rounded-full 
            h-full
            ${isTrackActive ? "bg-purple-600" : "bg-white"}
          `}
          />
        </RadixSlider.Track>
        <RadixSlider.Thumb
          className={`
          h-4 
          w-4 
          bg-white
          rounded-full 
          absolute 
          top-1/2
          transform 
          -translate-y-1/2
          -translate-x-1/2
          ${isTrackActive ? "opacity-100" : "opacity-0"}
          focus:outline-none
        `}
        />
      </RadixSlider.Root>
    </div>
  );
};

export default ProgressBar;

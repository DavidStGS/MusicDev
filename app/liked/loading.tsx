"use client";

import { ScaleLoader } from "react-spinners";

import Box from "@/components/Box";

const Loading = () => {
  return (
    <Box className="h-full flex items-center justify-center">
      <ScaleLoader color="#a855f7" />
    </Box>
  );
};

export default Loading;

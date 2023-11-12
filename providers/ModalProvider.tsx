"use client";

import AuthModal from "@/components/AuthModal";
import UploadModalComp from "@/components/UploadModa";
import { useEffect, useState } from "react";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      <UploadModalComp />
    </>
  );
};

export default ModalProvider;

"use client";

import { useEffect } from "react";
import { Next13ProgressBar } from "next13-progressbar";
import AOS from "aos";

type ClientLayoutProps = {
  children: React.ReactNode;
};

export default function ClientLayout({ children }: ClientLayoutProps) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");

    AOS.init({
      duration: 1200,
    });
  }, []);

  return (
    <>
      {children}
      <Next13ProgressBar
        height="2px"
        color="#0d6efd"
        options={{ showSpinner: false }}
        showOnShallow
      />
    </>
  );
}

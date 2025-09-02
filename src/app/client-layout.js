"use client";

import { useEffect } from "react";
import { Next13ProgressBar } from "next13-progressbar";
import AOS from "aos";

export default function ClientLayout({ children }) {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });

    // Initialize Bootstrap JavaScript
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
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

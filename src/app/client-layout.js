"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import AOS from "aos";
import NProgress from "nprogress";

NProgress.configure({ showSpinner: false });

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });

    // Initialize Bootstrap JavaScript
    import("bootstrap/dist/js/bootstrap.bundle.min.js");

    // Handle NProgress for navigation
    const handleStart = () => NProgress.start();
    const handleStop = () => NProgress.done();

    // Listen for route changes
    const originalPush = window.history.pushState;
    window.history.pushState = function(...args) {
      handleStart();
      originalPush.apply(window.history, args);
      setTimeout(handleStop, 100);
    };

    return () => {
      window.history.pushState = originalPush;
    };
  }, []);

  useEffect(() => {
    NProgress.done();
  }, [pathname]);

  return <>{children}</>;
}

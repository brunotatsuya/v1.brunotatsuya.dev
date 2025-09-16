"use client";

import { useEffect } from "react";
import { useBeforeUnload } from "react-use";

export default function PageLeaveConfirm() {
  const isConfirm = true;
  const message = "You have unsaved changes. Are you sure you want to leave?";

  useBeforeUnload(isConfirm, message);

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (isConfirm && !window.confirm(message)) {
        e.preventDefault();
        return false;
      }
    };

    window.addEventListener("beforeunload", handler);

    return () => {
      window.removeEventListener("beforeunload", handler);
    };
  }, [isConfirm, message]);

  return <></>;
}

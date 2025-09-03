import { useEffect } from "react";
import { useBeforeUnload } from "react-use";

export const useLeavePageConfirm = (
  isConfirm = true,
  message = "Are you sure want to leave this page?"
) => {
  useBeforeUnload(isConfirm, message);

  useEffect(() => {
    const handler = (e) => {
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
};

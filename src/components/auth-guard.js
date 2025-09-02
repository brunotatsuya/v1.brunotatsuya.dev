"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { checkSessionAction } from "../lib/actions/auth-actions";

import Loading from "./loading";

export default function AuthGuard({ children, showLoading }) {
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState();

  useEffect(() => {
    setIsAuthenticated(false);
    var delay = 0;
    if (showLoading) {
      delay = 1200;
    }
    setTimeout(async () => {
      const response = await checkSessionAction();
      if (!response.success) {
        setIsAuthenticated(false);
        router.push("/admin/login");
      } else {
        setIsAuthenticated(true);
      }
    }, delay);
  }, []);

  return isAuthenticated ? children : showLoading ? <Loading></Loading> : <></>;
}

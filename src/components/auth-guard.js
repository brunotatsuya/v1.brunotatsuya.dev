"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { checkSessionApi } from "@/actions/auth";

import Loading from "./loading";

export default function AuthGuard({ children, showLoading }) {
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await checkSessionApi();
        if (!response.success) {
          setIsAuthenticated(false);
          router.push("/admin/login");
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsAuthenticated(false);
        router.push("/admin/login");
      }
    };

    // Small delay if showLoading is true, otherwise immediate
    if (showLoading) {
      setTimeout(checkAuth, 800);
    } else {
      checkAuth();
    }
  }, [router, showLoading]);

  return isAuthenticated ? children : showLoading ? <Loading></Loading> : <></>;
}

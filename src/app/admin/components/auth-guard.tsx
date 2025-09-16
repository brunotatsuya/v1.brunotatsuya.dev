"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { checkSessionAction } from "@/actions/auth/mutations";

type AuthGuardProps = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { isAuthenticated: authStatus } = await checkSessionAction();
      setIsAuthenticated(authStatus);
      if (!authStatus) {
        router.push("/admin-login");
      }
    };
    checkAuth();
  }, [router]);

  return isAuthenticated ? children : <></>;
}

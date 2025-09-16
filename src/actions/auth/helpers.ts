import { NextResponse } from "next/server";

import { verifyToken } from "@/server/contexts/auth/services";

type AdminFn<TArgs extends any[], TResult> = (
  ...args: TArgs
) => Promise<TResult> | TResult;

export function requireAdminAuth<TArgs extends any[], TResult>(
  fn: AdminFn<TArgs, TResult>
): (...args: TArgs) => Promise<TResult | NextResponse> {
  return async (...args: TArgs): Promise<TResult | NextResponse> => {
    const auth = verifyToken();
    if (!auth) {
      return NextResponse.redirect("/admin/login");
    }
    return fn(...args);
  };
}

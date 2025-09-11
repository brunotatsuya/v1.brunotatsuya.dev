import { verifyToken } from "@/server/contexts/auth/services";

type AdminFn<TArgs extends any[], TResult> = (
  ...args: TArgs
) => Promise<TResult> | TResult;

export function requireAdminAuth<TArgs extends any[], TResult>(
  fn: AdminFn<TArgs, TResult>
): (...args: TArgs) => Promise<TResult> {
  return async (...args: TArgs): Promise<TResult> => {
    const auth = verifyToken();
    if (!auth) {
      throw new Error("Unauthorized");
    }
    return fn(...args);
  };
}

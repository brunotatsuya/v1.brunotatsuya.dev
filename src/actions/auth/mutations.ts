"use server";

import { signIn, signOut, verifyToken } from "@/server/contexts/auth/services";

export async function signInAction(
  username: string,
  password: string
): Promise<{ success: boolean }> {
  try {
    await signIn(username, password);
    return { success: true };
  } catch {
    return { success: false };
  }
}

export async function checkSessionAction(): Promise<{
  isAuthenticated: boolean;
}> {
  const isAuthenticated = await verifyToken();
  return { isAuthenticated };
}

export async function signOutAction() {
  await signOut();
}

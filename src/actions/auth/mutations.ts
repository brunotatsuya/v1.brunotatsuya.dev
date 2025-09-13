"use server";

import { signIn, signOut } from "@/server/contexts/auth/services";

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

export async function signOutAction() {
  await signOut();
}

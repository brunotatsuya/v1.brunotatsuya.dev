"use server";

import { signIn, signOut } from "@/server/contexts/auth/services";

export async function signInAction(
  username: string,
  password: string
): Promise<{ token: string }> {
  const token = await signIn(username, password);
  return { token };
}

export async function signOutAction() {
  await signOut();
}

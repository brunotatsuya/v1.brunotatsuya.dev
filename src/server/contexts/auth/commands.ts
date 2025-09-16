import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

import { env } from "@/server/config/env";
import { connectToDatabase } from "@/server/config/database";
import { AdminUser, AdminUserModel } from "@/server/models/admin-users";

import { JwtPayload } from "./types";

export async function findAdminUserByUsername(
  username: string
): Promise<AdminUser | null> {
  await connectToDatabase();

  const result = await AdminUserModel.findOne({ username });
  const user = result ? result.toObject() : null;

  return user;
}

export function verifyPassword(user: AdminUser, password: string): boolean {
  return bcrypt.compareSync(password, user.token);
}

export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, env.SECRET_KEY, { expiresIn: "24h" });
}

export function decodeToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, env.SECRET_KEY) as JwtPayload;
    return decoded;
  } catch {
    return null;
  }
}

export async function getTokenFromCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("tatsuya-token");
  return token ? token.value : null;
}

export async function setTokenCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: "tatsuya-token",
    value: token,
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
    httpOnly: true,
    secure: env.NODE_ENV === "production",
  });
}

export async function clearTokenCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("tatsuya-token");
}

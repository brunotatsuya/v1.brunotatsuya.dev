import {
  clearTokenCookie,
  generateToken,
  findAdminUserByUsername,
  setTokenCookie,
  verifyPassword,
  getTokenFromCookie,
  decodeToken,
} from "./commands";

export async function signIn(
  username: string,
  password: string
): Promise<string> {
  const user = await findAdminUserByUsername(username);
  if (!user) {
    throw new Error("Invalid username or password");
  }

  const isPasswordValid = verifyPassword(user, password);
  if (!isPasswordValid) {
    throw new Error("Invalid username or password");
  }

  const token = generateToken({ username: user.username });

  await setTokenCookie(token);

  return token;
}

export async function signOut() {
  await clearTokenCookie();
}

export async function verifyToken(): Promise<boolean> {
  const token = await getTokenFromCookie();
  if (!token) return false;

  const decoded = decodeToken(token);
  return decoded !== null;
}

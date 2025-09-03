import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { parseCookies } from "nookies";
import { cookies } from "next/headers";

import { findUserByUsername } from "../database/repositories/user-repository.js";

const SECRET_KEY = process.env.SECRET_KEY;
const TOKEN_NAME = "tatsuya-token";

export function verifyToken(context) {
  let token;

  if (context && context.req) {
    const { [TOKEN_NAME]: pageToken } = parseCookies(context);
    token = pageToken;
  } else {
    try {
      const cookieStore = cookies();
      token = cookieStore.get(TOKEN_NAME)?.value;
    } catch {
      return false;
    }
  }

  if (!token) {
    return false;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch {
    return false;
  }
}

export function generateToken(payload) {
  if (!SECRET_KEY) {
    throw new Error("SECRET_KEY environment variable is required");
  }

  return jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
}

export async function signIn(username, password) {
  try {
    const user = await findUserByUsername(username);

    if (!user) {
      return {
        success: false,
        message: "Invalid username or password.",
      };
    }

    const matched = bcrypt.compareSync(password, user.token);

    if (matched) {
      const token = generateToken({ username });
      return { success: true, token };
    } else {
      return {
        success: false,
        message: "Invalid username or password.",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Unable to reach database: " + error.message,
    };
  }
}

export function validateCredentials(username, password) {
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  return username === adminUsername && password === adminPassword;
}

export function verifyJwt(context) {
  return verifyToken(context);
}

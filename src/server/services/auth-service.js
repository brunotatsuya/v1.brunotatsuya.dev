import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { parseCookies } from "nookies";
import { cookies } from "next/headers";

import { UserRepository } from "../database/repositories/user-repository.js";

export class AuthService {
  constructor() {
    this.secretKey = process.env.SECRET_KEY;
    this.tokenName = "tatsuya-token";
    this.userRepository = new UserRepository();
  }

  verifyToken(context) {
    let token;

    // Handle different contexts (Pages API vs App Router)
    if (context && context.req) {
      // Pages API context
      const { [this.tokenName]: pageToken } = parseCookies(context);
      token = pageToken;
    } else {
      // App Router context - use Next.js cookies()
      try {
        const cookieStore = cookies();
        token = cookieStore.get(this.tokenName)?.value;
      } catch {
        // Fallback if cookies() is not available (e.g., in middleware)
        return false;
      }
    }

    if (!token) {
      return false;
    }

    try {
      const decoded = jwt.verify(token, this.secretKey);
      return decoded;
    } catch {
      return false;
    }
  }

  generateToken(payload) {
    if (!this.secretKey) {
      throw new Error("SECRET_KEY environment variable is required");
    }

    return jwt.sign(payload, this.secretKey, { expiresIn: "24h" });
  }

  async signIn(username, password) {
    try {
      const user = await this.userRepository.findByUsername(username);

      if (!user) {
        return {
          success: false,
          message: "Invalid username or password.",
        };
      }

      const matched = bcrypt.compareSync(password, user.token);

      if (matched) {
        const token = this.generateToken({ username });
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

  validateCredentials(username, password) {
    // This should ideally check against a database or external auth service
    // For now, keeping the existing logic pattern
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    return username === adminUsername && password === adminPassword;
  }
}

// Legacy function for backward compatibility
export function verifyJwt(context) {
  const authService = new AuthService();
  return authService.verifyToken(context);
}

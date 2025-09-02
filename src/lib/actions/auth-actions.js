"use server";

import { cookies } from "next/headers";

import { AuthService } from "../services/auth-service.js";

const authService = new AuthService();

export async function signInAction(username, password) {
  try {
    if (!username || !password) {
      return {
        success: false,
        message: "Username and password are required",
      };
    }

    const result = await authService.signIn(username, password);

    if (result.success) {
      // Set cookie using Next.js cookies API
      cookies().set("tatsuya-token", result.token, {
        path: "/",
        maxAge: 30 * 24 * 60 * 60, // 1 month
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });

      return {
        success: true,
        message: "Signed in successfully.",
      };
    } else {
      return {
        success: false,
        message: result.message,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Internal server error: " + error.message,
    };
  }
}

export async function checkSessionAction() {
  try {
    const resultVerifyJwt = authService.verifyToken();

    if (!resultVerifyJwt) {
      return {
        success: false,
        message: "Session not set.",
      };
    }

    return {
      success: true,
      data: resultVerifyJwt,
    };
  } catch (error) {
    return {
      success: false,
      message: "Internal server error: " + error.message,
    };
  }
}

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { AuthService } from "../../../../lib/services/auth-service.js";

const authService = new AuthService();

export async function POST(request) {
  try {
    // Get credentials from request body
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Username and password are required",
        },
        { status: 400 }
      );
    }

    // Attempt to sign in
    const result = await authService.signIn(username, password);

    if (result.success) {
      // Set cookie using Next.js cookies API
      cookies().set("tatsuya-token", result.token, {
        path: "/",
        maxAge: 30 * 24 * 60 * 60, // 1 month
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });

      return NextResponse.json({
        success: true,
        message: "Signed in successfully.",
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: result.message,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error: " + error.message,
      },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { signIn } from "@/server/services/auth.js";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Username and password are required" },
        { status: 400 }
      );
    }

    const result = await signIn(username, password);

    if (result.success) {
      cookies().set("tatsuya-token", result.token, {
        path: "/",
        maxAge: 30 * 24 * 60 * 60,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });

      return NextResponse.json({
        success: true,
        message: "Signed in successfully.",
      });
    } else {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error: " + error.message },
      { status: 500 }
    );
  }
}

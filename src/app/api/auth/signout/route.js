import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    // Clear the authentication cookie
    cookies().set("tatsuya-token", "", {
      path: "/",
      maxAge: 0, // Expire immediately
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return NextResponse.json({
      success: true,
      message: "Signed out successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error: " + error.message },
      { status: 500 }
    );
  }
}

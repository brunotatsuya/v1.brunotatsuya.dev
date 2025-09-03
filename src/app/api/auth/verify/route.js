import { NextResponse } from "next/server";

import { AuthService } from "@/lib/services/auth-service.js";

const authService = new AuthService();

export async function POST() {
  try {
    const resultVerifyJwt = authService.verifyToken();

    if (!resultVerifyJwt) {
      return NextResponse.json(
        { success: false, message: "Session not set." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      data: resultVerifyJwt,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error: " + error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return POST();
}

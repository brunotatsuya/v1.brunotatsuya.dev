import { NextResponse } from "next/server";

import { AuthService } from "../../../../lib/services/auth-service.js";

const authService = new AuthService();

export async function GET() {
  try {
    const resultVerifyJwt = authService.verifyToken();

    if (resultVerifyJwt) {
      return NextResponse.json({ success: true, data: resultVerifyJwt });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Session not set.",
        },
        { status: 401 }
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

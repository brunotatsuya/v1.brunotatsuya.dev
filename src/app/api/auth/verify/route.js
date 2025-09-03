import { NextResponse } from "next/server";

import { verifyToken } from "@/server/services/auth-service.js";

export async function POST() {
  try {
    const resultVerifyJwt = verifyToken();

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

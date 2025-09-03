import { NextResponse } from "next/server";

import { PostService } from "@/server/services/post-service.js";
import { AuthService } from "@/server/services/auth-service.js";

const postService = new PostService();
const authService = new AuthService();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit")
      ? parseInt(searchParams.get("limit"))
      : 1000;
    const adminOnly = searchParams.get("admin") === "true";

    if (adminOnly) {
      const decodedResult = authService.verifyToken();
      if (!decodedResult) {
        return NextResponse.json(
          {
            success: false,
            message: "This action requires admin authentication.",
          },
          { status: 401 }
        );
      }
      const posts = await postService.getAllPosts({ limit });
      return NextResponse.json({ success: true, data: posts });
    } else {
      const posts = await postService.getPublicPosts({ limit });
      return NextResponse.json({ success: true, data: posts });
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const decodedResult = authService.verifyToken();
    if (!decodedResult) {
      return NextResponse.json(
        {
          success: false,
          message: "This action requires admin authentication.",
        },
        { status: 401 }
      );
    }

    const postData = await request.json();
    const insertedPost = await postService.createPost(postData);

    return NextResponse.json(
      { success: true, data: insertedPost },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

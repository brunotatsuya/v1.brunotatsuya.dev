import { NextResponse } from "next/server";

import { PostService } from "../../../lib/services/post-service.js";
import { AuthService } from "../../../lib/services/auth-service.js";

const postService = new PostService();
const authService = new AuthService();

export async function GET() {
  try {
    // Admin endpoint - fetch all posts including unpublished
    const posts = await postService.getAllPosts();
    return NextResponse.json({ success: true, data: posts });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 400 }
    );
  }
}

export async function POST(request) {
  try {
    // Check if user is authenticated
    const decodedResult = authService.verifyToken();
    if (!decodedResult) {
      return NextResponse.json(
        {
          success: false,
          message: "This route is protected to admin.",
        },
        { status: 403 }
      );
    }

    // Get post data from request body
    const postData = await request.json();

    // Create the post
    const insertedPost = await postService.createPost(postData);

    return NextResponse.json({ success: true, data: insertedPost });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 400 }
    );
  }
}

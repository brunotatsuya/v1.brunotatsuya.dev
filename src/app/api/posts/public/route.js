import { NextResponse } from "next/server";

import { PostService } from "../../../../lib/services/post-service.js";

const postService = new PostService();

export async function GET() {
  try {
    const posts = await postService.getPublicPosts();
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

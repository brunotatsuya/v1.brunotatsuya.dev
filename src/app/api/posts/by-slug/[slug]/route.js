import { NextResponse } from "next/server";

import { PostService } from "../../../../../lib/services/post-service.js";

const postService = new PostService();

export async function GET(request, { params }) {
  try {
    const { slug } = params;

    if (!slug) {
      return NextResponse.json(
        {
          success: false,
          message: "Slug parameter is required",
        },
        { status: 400 }
      );
    }

    const post = await postService.getPostBySlug(slug);
    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 400;
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status }
    );
  }
}

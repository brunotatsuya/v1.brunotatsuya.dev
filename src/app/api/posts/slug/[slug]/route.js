import { NextResponse } from "next/server";

import {
  getPublishedPostBySlug,
  getPostBySlug,
} from "@/server/services/post.js";

export async function GET(request, { params }) {
  try {
    const { slug } = params;

    if (!slug) {
      return NextResponse.json(
        { success: false, message: "Post slug parameter is required" },
        { status: 400 }
      );
    }

    const { searchParams } = new URL(request.url);
    const publishedOnly = searchParams.get("published") !== "false";

    const post = publishedOnly
      ? await getPublishedPostBySlug(slug)
      : await getPostBySlug(slug);

    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    const statusCode = error.message.includes("not found") ? 404 : 500;
    return NextResponse.json(
      { success: false, message: error.message },
      { status: statusCode }
    );
  }
}

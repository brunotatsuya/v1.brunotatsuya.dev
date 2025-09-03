import { NextResponse } from "next/server";

import { getPostById, updatePost, deletePost } from "@/server/services/post.js";
import { verifyToken } from "@/server/services/auth.js";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Post ID parameter is required" },
        { status: 400 }
      );
    }

    const post = await getPostById(id);
    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    const statusCode = error.message.includes("not found") ? 404 : 500;
    return NextResponse.json(
      { success: false, message: error.message },
      { status: statusCode }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const decodedResult = verifyToken();
    if (!decodedResult) {
      return NextResponse.json(
        {
          success: false,
          message: "This action requires admin authentication.",
        },
        { status: 401 }
      );
    }

    const { id } = params;
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Post ID parameter is required" },
        { status: 400 }
      );
    }

    const updateData = await request.json();
    const result = await updatePost(id, updateData);

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    const statusCode = error.message.includes("not found") ? 404 : 500;
    return NextResponse.json(
      { success: false, message: error.message },
      { status: statusCode }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const decodedResult = verifyToken();
    if (!decodedResult) {
      return NextResponse.json(
        {
          success: false,
          message: "This action requires admin authentication.",
        },
        { status: 401 }
      );
    }

    const { id } = params;
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Post ID parameter is required" },
        { status: 400 }
      );
    }

    const result = await deletePost(id);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    const statusCode = error.message.includes("not found") ? 404 : 500;
    return NextResponse.json(
      { success: false, message: error.message },
      { status: statusCode }
    );
  }
}

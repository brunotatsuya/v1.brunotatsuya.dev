import { NextResponse } from "next/server";

import { PostService } from "../../../../lib/services/post-service.js";
import { AuthService } from "../../../../lib/services/auth-service.js";

const postService = new PostService();
const authService = new AuthService();

export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Post ID parameter is required",
        },
        { status: 400 }
      );
    }

    const post = await postService.getPostById(id);
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

export async function PUT(request, { params }) {
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

    const { id } = params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Post ID parameter is required",
        },
        { status: 400 }
      );
    }

    // Get update data from request body
    const updateData = await request.json();

    // Update the post
    const result = await postService.updatePost(id, updateData);

    return NextResponse.json({ success: true, data: result });
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

export async function DELETE(request, { params }) {
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

    const { id } = params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Post ID parameter is required",
        },
        { status: 400 }
      );
    }

    // Delete the post
    const result = await postService.deletePost(id);

    return NextResponse.json({ success: true, data: result });
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

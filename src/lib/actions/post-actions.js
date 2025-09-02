"use server";

import { PostService } from "../services/post-service.js";
import { AuthService } from "../services/auth-service.js";

const postService = new PostService();
const authService = new AuthService();

function requireAuth() {
  const decodedResult = authService.verifyToken();
  if (!decodedResult) {
    throw new Error("This action requires admin authentication.");
  }
  return decodedResult;
}

export async function getAllPostsAction() {
  try {
    requireAuth();
    const posts = await postService.getAllPosts();
    return {
      success: true,
      data: posts,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function getPostByIdAction(id) {
  try {
    if (!id) {
      throw new Error("Post ID parameter is required");
    }

    const post = await postService.getPostById(id);
    return {
      success: true,
      data: post,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function createPostAction(postData) {
  try {
    requireAuth();
    const insertedPost = await postService.createPost(postData);
    return {
      success: true,
      data: insertedPost,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function updatePostAction(id, updateData) {
  try {
    requireAuth();

    if (!id) {
      throw new Error("Post ID parameter is required");
    }

    const result = await postService.updatePost(id, updateData);
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function deletePostAction(id) {
  try {
    requireAuth();

    if (!id) {
      throw new Error("Post ID parameter is required");
    }

    const result = await postService.deletePost(id);
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

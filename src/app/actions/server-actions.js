"use server";

import { PostService } from "../../server/services/post-service.js";

const postService = new PostService();

// Server action for getting public posts (used by home page)
export async function getPublicPostsAction(limit = 1000) {
  try {
    const posts = await postService.getPublicPosts({ limit });
    return {
      success: true,
      data: posts,
    };
  } catch (error) {
    console.error("Failed to fetch public posts:", error);
    return {
      success: false,
      data: [],
      message: error.message,
    };
  }
}

// Server action for getting all published posts (used by blog page)
export async function getAllPublicPostsAction(limit = 1000) {
  try {
    const posts = await postService.getPublicPosts({ limit });
    return {
      success: true,
      data: posts,
    };
  } catch (error) {
    console.error("Failed to fetch all public posts:", error);
    return {
      success: false,
      data: [],
      message: error.message,
    };
  }
}

// Server action for getting post by slug (used by blog post page)
export async function getPublishedPostBySlugAction(slug) {
  try {
    const post = await postService.getPublishedPostBySlug(slug);
    return {
      success: true,
      data: post,
    };
  } catch (error) {
    console.error("Failed to fetch post by slug:", error);
    return {
      success: false,
      data: null,
      message: error.message,
    };
  }
}

// Server action for getting all published slugs (used by sitemap and static generation)
export async function getAllPublishedSlugsAction() {
  try {
    const slugs = await postService.getAllPublishedSlugs();
    return {
      success: true,
      data: slugs,
    };
  } catch (error) {
    console.error("Failed to fetch published slugs:", error);
    return {
      success: false,
      data: [],
      message: error.message,
    };
  }
}

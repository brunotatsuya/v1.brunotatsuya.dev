"use server";

import {
  getPublicPosts,
  getPublishedPostBySlug,
  getAllPublishedSlugs,
} from "../../server/services/post-service.js";

export async function getPublicPostsAction(limit = 1000) {
  try {
    const posts = await getPublicPosts({ limit });
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

export async function getAllPublicPostsAction(limit = 1000) {
  try {
    const posts = await getPublicPosts({ limit });
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

export async function getPublishedPostBySlugAction(slug) {
  try {
    const post = await getPublishedPostBySlug(slug);
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

export async function getAllPublishedSlugsAction() {
  try {
    const slugs = await getAllPublishedSlugs();
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

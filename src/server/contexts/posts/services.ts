import { BlogPost } from "@/server/models/blog-posts";

import {
  findPosts,
  findPostById,
  findPostBySlug,
  createPost,
  updatePost,
  deletePost,
} from "./commands";

export async function getPosts(limit: number = 1000): Promise<BlogPost[]> {
  return findPosts({}, limit);
}

export async function getPublishedPosts(
  limit: number = 1000
): Promise<BlogPost[]> {
  return findPosts({ isPublished: true }, limit);
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  return await findPostById(id);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return await findPostBySlug(slug);
}

export async function getPublishedPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  const post = await findPostBySlug(slug);
  return post && post.isPublished ? post : null;
}

export async function newPost(postData: Partial<BlogPost>): Promise<BlogPost> {
  return createPost(postData);
}

export async function editPost(
  id: string,
  updateData: Partial<BlogPost>
): Promise<BlogPost | null> {
  return updatePost(id, updateData);
}

export async function removePost(id: string): Promise<boolean> {
  return deletePost(id);
}

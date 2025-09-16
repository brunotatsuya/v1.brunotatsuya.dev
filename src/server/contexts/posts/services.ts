import { BlogPost } from "@/server/models/blog-posts";
import { revalidatePaths, CACHE_TREE } from "@/server/cache/revalidate";

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
  const post = await createPost(postData);
  updateCache(post);
  return post;
}

export async function editPost(
  id: string,
  updateData: Partial<BlogPost>
): Promise<BlogPost | null> {
  const post = await updatePost(id, updateData);
  if (!post) return null;

  updateCache(post);
  return post;
}

export async function removePost(id: string): Promise<boolean> {
  const post = await findPostById(id);
  if (!post) return false;

  await deletePost(id);
  updateCache(post);
  return true;
}

// private

async function updateCache(post: BlogPost) {
  if (post.isPublished) {
    revalidatePaths(CACHE_TREE.posts.public(post));
  }
  revalidatePaths(CACHE_TREE.posts.admin(post));
}

import {
  getPostById,
  getPosts,
  getPublishedPosts,
  getPublishedPostBySlug,
} from "@/server/contexts/posts/services";
import { BlogPost } from "@/server/models/blog-posts";

export async function getPostsAction(
  limit: number
): Promise<{ posts: BlogPost[] }> {
  const posts = await getPosts(limit);
  return { posts };
}

export async function getPublishedPostsAction(
  limit: number
): Promise<{ posts: BlogPost[] }> {
  const posts = await getPublishedPosts(limit);
  return { posts };
}

export async function getPostByIdAction(
  id: string
): Promise<{ post: BlogPost | null }> {
  const post = await getPostById(id);
  return { post };
}

export async function getPublishedPostBySlugAction(
  slug: string
): Promise<{ post: BlogPost | null }> {
  const post = await getPublishedPostBySlug(slug);
  return { post };
}

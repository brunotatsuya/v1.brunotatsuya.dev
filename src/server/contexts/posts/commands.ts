import { connectToDatabase } from "@/server/config/database";
import { BlogPost, BlogPostModel } from "@/server/models/blog-posts";

import { PostFilters } from "./types";

export async function findPosts(
  filters: PostFilters = {},
  limit: number
): Promise<BlogPost[]> {
  await connectToDatabase();

  const result = await BlogPostModel.find(filters)
    .sort({ datePublished: -1 })
    .limit(limit);
  const posts = result.map((post) => post.toObject());

  return posts;
}

export async function findPostBySlug(slug: string): Promise<BlogPost | null> {
  await connectToDatabase();

  const result = await BlogPostModel.findOne({ slug });
  const post = result ? result.toObject() : null;

  return post;
}

export async function findPostById(id: string): Promise<BlogPost | null> {
  await connectToDatabase();

  const result = await BlogPostModel.findById(id);
  const post = result ? result.toObject() : null;

  return post;
}

export async function createPost(
  postData: Partial<BlogPost>
): Promise<BlogPost> {
  await connectToDatabase();

  const newPost = new BlogPostModel(postData);
  await newPost.save();
  return newPost.toObject();
}

export async function updatePost(
  id: string,
  updateData: Partial<BlogPost>
): Promise<BlogPost | null> {
  await connectToDatabase();

  const result = await BlogPostModel.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  const updatedPost = result ? result.toObject() : null;

  return updatedPost;
}

export async function deletePost(id: string): Promise<boolean> {
  await connectToDatabase();

  const result = await BlogPostModel.findByIdAndDelete(id);
  return result !== null;
}

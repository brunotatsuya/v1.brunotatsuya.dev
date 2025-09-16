"use server";

import {
  editPost,
  removePost,
  newPost,
} from "@/server/contexts/posts/services";
import { BlogPost } from "@/server/models/blog-posts";
import { requireAdminAuth } from "@/actions/auth/helpers";

export const createPostAction = requireAdminAuth(
  async (postData: Partial<BlogPost>): Promise<{ post: BlogPost }> => {
    const post = await newPost(postData);
    return { post };
  }
);

export const updatePostAction = requireAdminAuth(
  async (
    id: string,
    updateData: Partial<BlogPost>
  ): Promise<{ post: BlogPost | null }> => {
    const post = await editPost(id, updateData);
    return { post };
  }
);

export const deletePostAction = requireAdminAuth(
  async (id: string): Promise<{ success: boolean }> => {
    const success = await removePost(id);
    return { success };
  }
);

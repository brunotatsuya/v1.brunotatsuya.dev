import { revalidatePath } from "next/cache";

import { BlogPost } from "@/server/models/blog-posts";

export function revalidatePaths(paths: string[]) {
  paths.forEach((path) => {
    revalidatePath(path);
  });
}

export const CACHE_TREE = {
  posts: {
    admin: (blog: BlogPost) => ["/admin", `/admin/edit-post/${blog.id}`],
    public: (blog: BlogPost) => [
      "/",
      "/blog",
      "/sitemap",
      `/blog/${blog.slug}`,
    ],
  },
};

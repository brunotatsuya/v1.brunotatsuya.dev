import {
  findAllPosts,
  findPostBySlug,
  findPostById,
  createPost as createPostRepository,
  updatePostById,
  deletePostById,
} from "../commands/post.js";

export async function getPublicPosts({ limit = 1000 } = {}) {
  try {
    return await findAllPosts({
      limit,
      onlyPublished: true,
    });
  } catch (error) {
    throw new Error(`Failed to fetch public posts: ${error.message}`);
  }
}

export async function getAllPosts({ limit = 1000 } = {}) {
  try {
    return await findAllPosts({
      limit,
      onlyPublished: false,
    });
  } catch (error) {
    throw new Error(`Failed to fetch all posts: ${error.message}`);
  }
}

export async function getPostBySlug(slug) {
  if (!slug) {
    throw new Error("Slug is required");
  }

  try {
    const post = await findPostBySlug(slug);
    if (!post) {
      throw new Error("Post not found");
    }
    return post;
  } catch (error) {
    throw new Error(`Failed to fetch post: ${error.message}`);
  }
}

export async function getPublishedPostBySlug(slug) {
  if (!slug) {
    throw new Error("Slug is required");
  }

  try {
    const post = await findPostBySlug(slug);
    if (!post || !post.isPublished) {
      throw new Error("Post not found");
    }
    return post;
  } catch (error) {
    throw new Error(`Failed to fetch post: ${error.message}`);
  }
}

export async function getAllPublishedSlugs() {
  try {
    const posts = await findAllPosts({
      onlyPublished: true,
      limit: 10000,
    });
    return posts.map((post) => ({ slug: post.slug }));
  } catch (error) {
    throw new Error(`Failed to fetch post slugs: ${error.message}`);
  }
}

export async function getPostById(id) {
  if (!id) {
    throw new Error("Post ID is required");
  }

  try {
    const post = await findPostById(id);
    if (!post) {
      throw new Error("Post not found");
    }
    return post;
  } catch (error) {
    throw new Error(`Failed to fetch post: ${error.message}`);
  }
}

export async function createPost(postData) {
  if (!postData) {
    throw new Error("Post data is required");
  }

  if (!postData.title || !postData.content) {
    throw new Error("Title and content are required");
  }

  try {
    const post = {
      ...postData,
      dateCreated: new Date(),
      datePublished: postData.isPublished ? new Date() : null,
    };

    return await createPostRepository(post);
  } catch (error) {
    throw new Error(`Failed to create post: ${error.message}`);
  }
}

export async function updatePost(id, updateData) {
  if (!id) {
    throw new Error("Post ID is required");
  }

  if (!updateData) {
    throw new Error("Update data is required");
  }

  try {
    const dataWithTimestamp = {
      ...updateData,
      dateModified: new Date(),
    };

    if (updateData.isPublished && !updateData.datePublished) {
      dataWithTimestamp.datePublished = new Date();
    }

    const result = await updatePostById(id, dataWithTimestamp);

    if (result.matchedCount === 0) {
      throw new Error("Post not found");
    }

    return { success: true, modifiedCount: result.modifiedCount };
  } catch (error) {
    throw new Error(`Failed to update post: ${error.message}`);
  }
}

export async function deletePost(id) {
  if (!id) {
    throw new Error("Post ID is required");
  }

  try {
    const result = await deletePostById(id);

    if (result.deletedCount === 0) {
      throw new Error("Post not found");
    }

    return { success: true, deletedCount: result.deletedCount };
  } catch (error) {
    throw new Error(`Failed to delete post: ${error.message}`);
  }
}

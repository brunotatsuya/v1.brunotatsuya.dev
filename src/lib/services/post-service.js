import { PostRepository } from "../database/repositories/post-repository.js";

export class PostService {
  constructor() {
    this.postRepository = new PostRepository();
  }

  async getPublicPosts({ limit = 1000 } = {}) {
    try {
      return await this.postRepository.findAll({
        limit,
        onlyPublished: true,
      });
    } catch (error) {
      throw new Error(`Failed to fetch public posts: ${error.message}`);
    }
  }

  async getAllPosts({ limit = 1000 } = {}) {
    try {
      return await this.postRepository.findAll({
        limit,
        onlyPublished: false,
      });
    } catch (error) {
      throw new Error(`Failed to fetch all posts: ${error.message}`);
    }
  }

  async getPostBySlug(slug) {
    if (!slug) {
      throw new Error("Slug is required");
    }

    try {
      const post = await this.postRepository.findBySlug(slug);
      if (!post) {
        throw new Error("Post not found");
      }
      return post;
    } catch (error) {
      throw new Error(`Failed to fetch post: ${error.message}`);
    }
  }

  async getPublishedPostBySlug(slug) {
    if (!slug) {
      throw new Error("Slug is required");
    }

    try {
      const post = await this.postRepository.findBySlug(slug);
      if (!post || !post.isPublished) {
        throw new Error("Post not found");
      }
      return post;
    } catch (error) {
      throw new Error(`Failed to fetch post: ${error.message}`);
    }
  }

  async getAllPublishedSlugs() {
    try {
      const posts = await this.postRepository.findAll({
        onlyPublished: true,
        limit: 10000, // Get all published posts for static generation
      });
      return posts.map((post) => ({ slug: post.slug }));
    } catch (error) {
      throw new Error(`Failed to fetch post slugs: ${error.message}`);
    }
  }

  async getPostById(id) {
    if (!id) {
      throw new Error("Post ID is required");
    }

    try {
      const post = await this.postRepository.findById(id);
      if (!post) {
        throw new Error("Post not found");
      }
      return post;
    } catch (error) {
      throw new Error(`Failed to fetch post: ${error.message}`);
    }
  }

  async createPost(postData) {
    if (!postData) {
      throw new Error("Post data is required");
    }

    // Basic validation
    if (!postData.title || !postData.content) {
      throw new Error("Title and content are required");
    }

    try {
      // Add creation timestamp
      const post = {
        ...postData,
        dateCreated: new Date(),
        datePublished: postData.isPublished ? new Date() : null,
      };

      return await this.postRepository.create(post);
    } catch (error) {
      throw new Error(`Failed to create post: ${error.message}`);
    }
  }

  async updatePost(id, updateData) {
    if (!id) {
      throw new Error("Post ID is required");
    }

    if (!updateData) {
      throw new Error("Update data is required");
    }

    try {
      // Add update timestamp
      const dataWithTimestamp = {
        ...updateData,
        dateModified: new Date(),
      };

      // If publishing, set publish date
      if (updateData.isPublished && !updateData.datePublished) {
        dataWithTimestamp.datePublished = new Date();
      }

      const result = await this.postRepository.updateById(
        id,
        dataWithTimestamp
      );

      if (result.matchedCount === 0) {
        throw new Error("Post not found");
      }

      return { success: true, modifiedCount: result.modifiedCount };
    } catch (error) {
      throw new Error(`Failed to update post: ${error.message}`);
    }
  }

  async deletePost(id) {
    if (!id) {
      throw new Error("Post ID is required");
    }

    try {
      const result = await this.postRepository.deleteById(id);

      if (result.deletedCount === 0) {
        throw new Error("Post not found");
      }

      return { success: true, deletedCount: result.deletedCount };
    } catch (error) {
      throw new Error(`Failed to delete post: ${error.message}`);
    }
  }
}

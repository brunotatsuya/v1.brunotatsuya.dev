import { getCollection } from "@/server/database/connection.js";

const COLLECTION_NAME = "blog-posts";

export async function findAllPosts({
  limit = 1000,
  onlyPublished = true,
} = {}) {
  const collection = await getCollection(COLLECTION_NAME);
  const filters = onlyPublished ? { isPublished: true } : {};

  const posts = await collection
    .find(filters, {
      projection: {
        _id: true,
        slug: true,
        author: true,
        title: true,
        coverImgurl: true,
        description: true,
        datePublished: true,
        isPublished: true,
      },
    })
    .sort({ datePublished: -1 })
    .limit(limit)
    .toArray();

  return posts?.length > 0 ? JSON.parse(JSON.stringify(posts)) : [];
}

export async function findPostBySlug(slug) {
  const collection = await getCollection(COLLECTION_NAME);
  const post = await collection.findOne({ slug });
  return post ? JSON.parse(JSON.stringify(post)) : null;
}

export async function findPostById(id) {
  const collection = await getCollection(COLLECTION_NAME);
  const { ObjectId } = await import("mongodb");
  const post = await collection.findOne({ _id: new ObjectId(id) });
  return post ? JSON.parse(JSON.stringify(post)) : null;
}

export async function createPost(post) {
  const collection = await getCollection(COLLECTION_NAME);
  const result = await collection.insertOne(post);
  post._id = result.insertedId.toString();
  return post;
}

export async function updatePostById(id, updateData) {
  const collection = await getCollection(COLLECTION_NAME);
  const { ObjectId } = await import("mongodb");
  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updateData }
  );
  return result;
}

export async function deletePostById(id) {
  const collection = await getCollection(COLLECTION_NAME);
  const { ObjectId } = await import("mongodb");
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result;
}

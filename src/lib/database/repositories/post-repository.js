import { connectToDatabase } from "../connection.js";

export class PostRepository {
  constructor() {
    this.collectionName = "blog-posts";
  }

  async getCollection() {
    const { db } = await connectToDatabase();
    return db.collection(this.collectionName);
  }

  async findAll({ limit = 1000, onlyPublished = true } = {}) {
    const collection = await this.getCollection();
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

  async findBySlug(slug) {
    const collection = await this.getCollection();
    const post = await collection.findOne({ slug });
    return post ? JSON.parse(JSON.stringify(post)) : null;
  }

  async findById(id) {
    const collection = await this.getCollection();
    const { ObjectId } = await import("mongodb");
    const post = await collection.findOne({ _id: new ObjectId(id) });
    return post ? JSON.parse(JSON.stringify(post)) : null;
  }

  async create(post) {
    const collection = await this.getCollection();
    const result = await collection.insertOne(post);
    post._id = result.insertedId.toString();
    return post;
  }

  async updateById(id, updateData) {
    const collection = await this.getCollection();
    const { ObjectId } = await import("mongodb");
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    return result;
  }

  async deleteById(id) {
    const collection = await this.getCollection();
    const { ObjectId } = await import("mongodb");
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result;
  }
}

import { connectToDatabase } from "../connection.js";

export class UserRepository {
  constructor() {
    this.collectionName = "admin-users";
  }

  async getCollection() {
    const { db } = await connectToDatabase();
    return db.collection(this.collectionName);
  }

  async findByUsername(username) {
    const collection = await this.getCollection();
    const user = await collection.findOne(
      { username },
      {
        projection: {
          _id: false,
          username: true,
          token: true,
        },
      }
    );
    return user;
  }

  async create(userData) {
    const collection = await this.getCollection();
    const result = await collection.insertOne(userData);
    return result;
  }

  async updateByUsername(username, updateData) {
    const collection = await this.getCollection();
    const result = await collection.updateOne(
      { username },
      { $set: updateData }
    );
    return result;
  }
}

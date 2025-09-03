import { connectToDatabase } from "../connection.js";

const COLLECTION_NAME = "admin-users";

async function getUserCollection() {
  const { db } = await connectToDatabase();
  return db.collection(COLLECTION_NAME);
}

export async function findUserByUsername(username) {
  const collection = await getUserCollection();
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

export async function createUser(userData) {
  const collection = await getUserCollection();
  const result = await collection.insertOne(userData);
  return result;
}

export async function updateUserByUsername(username, updateData) {
  const collection = await getUserCollection();
  const result = await collection.updateOne({ username }, { $set: updateData });
  return result;
}

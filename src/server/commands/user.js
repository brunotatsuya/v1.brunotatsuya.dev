import { getCollection } from "@/server/database/connection.js";

const COLLECTION_NAME = "admin-users";

export async function findUserByUsername(username) {
  const collection = await getCollection(COLLECTION_NAME);
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
  const collection = await getCollection(COLLECTION_NAME);
  const result = await collection.insertOne(userData);
  return result;
}

export async function updateUserByUsername(username, updateData) {
  const collection = await getCollection(COLLECTION_NAME);
  const result = await collection.updateOne({ username }, { $set: updateData });
  return result;
}

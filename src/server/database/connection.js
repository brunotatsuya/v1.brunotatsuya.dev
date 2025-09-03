import { MongoClient } from "mongodb";

// Get environment variables
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.DB_NAME;

// Check if MONGODB_URI is defined
if (!MONGODB_URI) {
  throw new Error("Define the MONGODB_URI environmental variable");
}

// Check if MONGODB_DB is defined
if (!MONGODB_DB) {
  throw new Error("Define the MONGODB_DB environmental variable");
}

// Global variables to cache the connection
let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  // If connection already cached, return the cached connection
  if (cachedClient && cachedDb) {
    return {
      client: cachedClient,
      db: cachedDb,
    };
  }

  // Connect to cluster
  let client = new MongoClient(MONGODB_URI);
  await client.connect();
  let db = client.db(MONGODB_DB);

  // Set cache
  cachedClient = client;
  cachedDb = db;

  return {
    client: cachedClient,
    db: cachedDb,
  };
}

export async function getCollection(collectionName) {
  const { db } = await connectToDatabase();
  return db.collection(collectionName);
}

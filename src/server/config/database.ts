import { exit } from "process";

import { connect } from "mongoose";

import { env } from "@/server/config/env";

let isConnected = false;

export async function connectToDatabase(): Promise<void> {
  if (isConnected) {
    return;
  }

  try {
    await connect(env.MONGODB_URI);
    isConnected = true;
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
    isConnected = false;
    exit(1);
  }
}

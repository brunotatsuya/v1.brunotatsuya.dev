import { exit } from "process";

import { z } from "zod";

const envSchema = z.object({
  SECRET_KEY: z.string().min(1),
  MONGODB_URI: z.string().min(1),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("❌ Invalid environment variables:", _env.error.issues);
  exit(1);
}

export const env = _env.data;

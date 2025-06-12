import { z } from 'zod';
import dotenv from 'dotenv';
dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('test'),
  HOST: z.string().default('localhost'),
  PORT: z.coerce.number().default(3000),
  CORS_ORIGIN: z.string().default('http://localhost:3000'),
  COMMON_RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(1000),
  COMMON_RATE_LIMIT_WINDOW_MS: z.coerce.number().default(1000),
  MONGO_CONNECTION: z.string().default('mongodb://localhost:27017/mydatabase'),
  JWT_SECRET: z.string().default('xxxxxxx'),
});

const validatedEnv = envSchema.parse(process.env);

export const env = {
  NODE_ENV: validatedEnv.NODE_ENV,
  HOST: validatedEnv.HOST,
  PORT: validatedEnv.PORT,
  CORS_ORvalidatedEnvIGIN: validatedEnv.CORS_ORIGIN,
  COMMON_RATE_LIMIT_MAX_REQUESTS: validatedEnv.COMMON_RATE_LIMIT_MAX_REQUESTS,
  COMMON_RATE_LIMIT_WINDOW_MS: validatedEnv.COMMON_RATE_LIMIT_WINDOW_MS,
  MONGO_CONNECTION: validatedEnv.MONGO_CONNECTION,
  JWT_SECRET: validatedEnv.JWT_SECRET,
};

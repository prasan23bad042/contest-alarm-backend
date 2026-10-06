import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

interface Env {
  PORT: number;
  DATABASE_URL: string;
  NODE_ENV: string;
}

const getEnv = (): Env => {
  return {
    PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    DATABASE_URL: process.env.DATABASE_URL || '',
    NODE_ENV: process.env.NODE_ENV || 'development',
  };
};

export const env = getEnv();

// Basic validation
if (!env.DATABASE_URL) {
  console.warn('[Warning]: DATABASE_URL is not set in the environment variables.');
}

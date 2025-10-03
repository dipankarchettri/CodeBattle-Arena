import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import { WebSocket } from "ws";   // ✅ Correct import
import * as schema from "@shared/schema";

// Tell Neon to use Node's WebSocket
neonConfig.webSocketConstructor = WebSocket;

// Ensure .env is configured
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to create your .env file?"
  );
}

// Create connection pool
export const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Initialize Drizzle ORM
export const db = drizzle(pool, { schema });

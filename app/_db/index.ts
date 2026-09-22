/**
 * Node Modules
 */
import { loadEnvConfig } from "@next/env";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import "server-only";

loadEnvConfig(process.cwd());

const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle({ client, casing: "snake_case" });

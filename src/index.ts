import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { DATABASE_URL } from "./constants/env";

const db = drizzle(DATABASE_URL);

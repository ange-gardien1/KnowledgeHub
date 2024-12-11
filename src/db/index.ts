import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/neon-http";
import dotenv from "dotenv";


dotenv.config();


let sql;
sql = neon(process.env.DATABASE_URL! );

export const db = drizzle(sql, { schema });

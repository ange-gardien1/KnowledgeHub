import { db } from "@/db";
import { protectedProcedure } from "../trpc";
import { users } from "@/db/schema";

export const getAllUsers = protectedProcedure.query(async() => {
    const user = await db.select().from(users).limit(5);
    return user;
})
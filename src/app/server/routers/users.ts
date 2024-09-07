import { db } from "@/db";
import { protectedProcedure } from "../trpc";
import { users } from "@/db/schema";

export const getUsers = protectedProcedure.query(async () => {
    const Users = await db.select({
      id: users.id,
      username: users.name,  // Assuming 'name' is the actual field
    }).from(users);
  
    return Users; // Return the result of the query, not the schema
});

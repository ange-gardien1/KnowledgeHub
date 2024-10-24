import { db } from "@/db";
import { protectedProcedure } from "../trpc";
import { users } from "@/db/schema";

export const getUsers = protectedProcedure.query(async () => {
    const Users = await db.select({
      id: users.id,
      username: users.name,
      roleId:users.name,  
    }).from(users);
  
    return Users; 
});

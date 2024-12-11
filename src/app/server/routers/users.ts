import { db } from "@/db";
import { protectedProcedure, publicProcedure } from "../trpc";
import { users } from "@/db/schema";

import { z } from "zod";

export const getUsers = protectedProcedure.query(async () => {
  const Users = await db
    .select({
      id: users.id,
      username: users.name,
      roleId: users.name,
    })
    .from(users);

  return Users;
});

export const registerUser = publicProcedure
  .input(
    z.object({
      name: z.string().optional(),
      email: z.string().email(),
      password: z.string(),
      roleId: z.string().uuid().optional(),
    })
  )
  .mutation(async ({ input }) => {
    const { name, email, password, roleId } = input;

    const hashedPassword = "hashedPassword";

    try {
      const newUser = await db
        .insert(users)
        .values({
          id: crypto.randomUUID(),
          name: name || null, 
          email,
          image: null,
          emailVerified: null, 
          roleId: roleId || null, 
        })
        .returning({ id: users.id, email: users.email });

      return {
        success: true,
        message: "User registered successfully",
        user: newUser[0], 
      };
    } catch (error) {
      console.error("Error registering user:", error);
      return {
        success: false,
        message: "Failed to register user",
      };
    }
  });

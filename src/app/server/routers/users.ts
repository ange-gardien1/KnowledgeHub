import { db } from "@/db";
import { protectedProcedure, publicProcedure } from "../trpc";
import { users } from "@/db/schema";

import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";

import { compare } from "bcrypt";


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
          password,
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

  

  export const loginUser = publicProcedure
  .input(
    z.object({
      email: z.string().email(),
      password: z.string().min(6),
    })
  )
  .mutation(async ({ input }) => {
    const { email, password } = input;

    const user = await db.select().from(users).where(eq(users.email, email)).then((res) => res[0]);

    if (!user) {
      throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
    }

    const passwordMatch = await compare(password, user.password || "");

    if (!passwordMatch) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid password" });
    }

    return {
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
      },
    };
  });
import { db } from "@/db";
import { users } from "@/db/schema";
import { protectedProcedure } from "../../trpc";
import { eq } from "drizzle-orm";
import { z } from "zod";

const adminRoleId = "8f6d6f9e-36d6-4db1-8f6a-c1a0dfcc8a72";

export const promoteToAdmin = protectedProcedure
  .input(z.object({ userId: z.string() }))

  .mutation(async ({ input }) => {
    const { userId } = input;

    const result = await db
      .update(users)
      .set({ roleId: adminRoleId })
      .where(eq(users.id, userId));

    return result;
  });

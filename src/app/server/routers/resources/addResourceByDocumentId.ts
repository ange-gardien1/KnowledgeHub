import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import { db } from "@/db";
import { resources } from "@/db/schema";
import { sql } from "drizzle-orm";

export const addResource = protectedProcedure
  .input(z.object({
    documentId: z.string().uuid(),
  }))
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session?.user?.id;

    if (!userId) {
      throw new Error("User ID not found in session");
    }

    await db.insert(resources).values({
      id: sql`gen_random_uuid()`,
      userId,
      documentId: input.documentId,
      createdAt: sql`now()`,
      updatedAt: sql`now()`,
    });

    return { success: true };
  });

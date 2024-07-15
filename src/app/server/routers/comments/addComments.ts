import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import { db } from "@/db";
import { comments } from "@/db/schema";
import { sql } from "drizzle-orm";

export const addComment = protectedProcedure
  .input(z.object({
    documentId: z.string().uuid(),
    content: z.string().min(1),
  }))
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session?.user?.id;

    if (!userId) {
      throw new Error("User ID not found in session");
    }

    await db.insert(comments).values({
      id: sql`gen_random_uuid()`,
      documentId: input.documentId,
      userId,
      content: input.content,
      createdAt: sql`now()`,
      updatedAt: sql`now()`,
    });

    return { success: true };
  });

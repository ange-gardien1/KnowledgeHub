import { z } from "zod";
import { publicProcedure } from "../../trpc";
import { db } from "@/db";
import { comments, users } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export const getCommentsByDocumentId = publicProcedure
  .input(
    z.object({
      documentId: z.string().uuid(),
    })
  )
  .query(async ({ input }) => {
    const documentComments = await db
      .select({
        content: comments.content,
        userId: comments.userId,
      })
      .from(comments)
      .innerJoin(users, eq(comments.userId, users.id))
      .where(eq(comments.documentId, input.documentId));

    return documentComments;
  });

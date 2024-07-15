import { z } from "zod";
import { publicProcedure } from "../../trpc";
import { db } from "@/db";
import { comments } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getCommentsByDocumentId = publicProcedure
  .input(z.object({
    documentId: z.string().uuid(),
  }))
  .query(async ({ input }) => {
    const documentComments = await db.select().from(comments).where(eq(comments.documentId, input.documentId));

    return documentComments;
  });

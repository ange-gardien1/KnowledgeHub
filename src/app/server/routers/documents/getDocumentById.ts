import { db } from "@/db";
import { protectedProcedure } from "../../trpc";
import { documents } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";


const getDocumentByIdInput = z.object({
  documentId: z.string().uuid(),
});

export const getDocumentById = protectedProcedure
  .input(getDocumentByIdInput)
  .query(async ({ ctx, input }) => {
    const userId = ctx.session?.user?.id;
    if (!userId) {
      throw new Error("User Not Found");
    }

    const document = await db
    .select()
    .from(documents)
    .where(eq(documents.id, input.documentId))
    ._

    if (!document) {
      throw new Error("Document Not Found");
    }

    return document;
  });

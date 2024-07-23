import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";
import { documents } from "@/db/schema";
import { eq } from "drizzle-orm";

export const deleteDocument = protectedProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .mutation(async ({ input: { id }, ctx: { session } }) => {
    if (!session?.user?.id) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "yo must be logged in to delete a document",
      });
    }
    try {
      const deletedDocument = await db
        .delete(documents)
        .where(eq(documents.id, id))
        .returning();
      if (!deleteDocument) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Document not found",
        });
      }
      return { document: deletedDocument };
    } catch (err: any) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete document",
        cause: err,
      });
    }
  });

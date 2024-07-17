import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import { notifications, documents, editRequests } from "@/db/schema";
import { db } from "@/db";
import { sql, eq } from "drizzle-orm";

export const createEditRequest = protectedProcedure
  .input(
    z.object({
      documentId: z.string(),
      userId: z.string()
    })
  )
  .mutation(async ({ input: { documentId, userId }, ctx: { session } }) => {
    if (!session?.user?.id) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to request an edit",
      });
    }

    try {
      const [document] = await db.select().from(documents).where(eq(documents.id, documentId));
      if (!document) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Document not found",
        });
      }

      const editRequest = await db.insert(editRequests).values({
        id: sql`gen_random_uuid()`,
        documentId,
        userId: session.user.id,
        requestType: 'edit',
        status: 'pending',
        createdAt: sql`now()`,
        updatedAt: sql`now()`,
      });

      await db.insert(notifications).values({
        id: sql`gen_random_uuid()`,
        userId: document.userId, 
        type: 'edit_request',
        message: `Edit request for document ${document.title}`,
        read: false,
        createdAt: sql`now()`,
      });

      return { editRequest };
    } catch (err: any) {
      console.log(err);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create edit request",
        cause: err,
      });
    }
  });

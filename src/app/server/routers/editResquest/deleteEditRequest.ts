import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../../trpc";
import { editRequests } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";

export const deleteEditRequest = protectedProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .mutation(async ({ input: { id }, ctx: { session } }) => {
    if (!session?.user?.id) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to delete an edit request",
      });
    }
    try {
      const deletedRequest = await db
        .delete(editRequests)
        .where(eq(editRequests.id, id))
        .returning();

      if (deletedRequest.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Edit Request Not Found",
        });
      }

      return { editRequest: deletedRequest[0] };
    } catch (err: any) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete Edit Request",
        cause: err,
      });
    }
  });

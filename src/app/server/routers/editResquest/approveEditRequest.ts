import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import { db } from "@/db";
import { editRequests } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { StatusType } from "@/db/schema";

export const approveEditRequest = protectedProcedure
  .input(z.object({
    editRequestId: z.string().uuid(),
  }))
  .mutation(async ({ input: { editRequestId }, ctx: { session } }) => {
    const userId = session?.user?.id;
    if (!userId) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to approve an edit request",
      });
    }

    try {
      const updateResult = await db
        .update(editRequests)
        .set({
          status: StatusType.APPROVED,
          updatedAt: sql`now()`,
        })
        .where(eq(editRequests.id, editRequestId))
        .returning();

      if (updateResult.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Edit request not found or not updated",
        });
      }

      return updateResult[0];
    } catch (err) {
      console.error("Error approving edit request:", err);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to approve edit request",
        cause: err,
      });
    }
  });

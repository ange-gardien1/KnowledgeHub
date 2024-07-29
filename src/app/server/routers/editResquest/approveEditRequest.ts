// app/server/routers/editRequest/approveEditRequest.ts
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import { editRequests, notifications } from "@/db/schema";
import { db } from "@/db";
import { sql, eq } from "drizzle-orm";

export const approveEditRequest = protectedProcedure
  .input(z.object({
    editRequestId: z.string()
  }))
  .mutation(async ({ input: { editRequestId }, ctx: { session } }) => {
    if (!session?.user?.id) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to approve an edit request",
      });
    }

    try {
      const [editRequest] = await db.select().from(editRequests).where(eq(editRequests.id, editRequestId));
      if (!editRequest) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Edit request not found",
        });
      }

      if (editRequest.status !== 'pending') {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Edit request is not in pending status",
        });
      }

      // Update the edit request status to 'approved'
      await db.update(editRequests)
        .set({
          status: 'approved',
          updatedAt: sql`now()`,
        })
        .where(eq(editRequests.id, editRequestId));

      // Mark the notification as read
      await db.update(notifications)
        .set({
          read: true,
        })
        .where(eq(notifications.id, editRequestId));

      return { success: true };
    } catch (err: any) {
      console.log(err);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to approve edit request",
        cause: err,
      });
    }
  });

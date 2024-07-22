import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import { notifications, editRequests, documents, users } from "@/db/schema";
import { db } from "@/db";
import { sql, eq } from "drizzle-orm";

export const getRequestDetailsByNotificationId = protectedProcedure
  .input(z.object({
    notificationId: z.string()
  }))
  .query(async ({ input: { notificationId }, ctx: { session } }) => {
    if (!session?.user?.id) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to get request details",
      });
    }

    try {
      const [notification] = await db.select().from(notifications).where(eq(notifications.id, sql`${notificationId}`));
      if (!notification) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Notification not found",
        });
      }

      if (notification.type !== 'edit_request') {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Notification is not an edit request",
        });
      }

      const [editRequest] = await db.select().from(editRequests).where(eq(editRequests.id, sql`${notification.id}`));
      if (!editRequest) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Edit request not found",
        });
      }

      const [document] = await db.select().from(documents).where(eq(documents.id, sql`${editRequest.documentId}`));
      if (!document) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Document not found",
        });
      }

      const [requestingUser] = await db.select().from(users).where(eq(users.id, sql`${editRequest.userId}`));
      if (!requestingUser) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Requesting user not found",
        });
      }

      return {
        notification,
        editRequest,
        document,
        requestingUser,
      };
    } catch (err: any) {
      console.log(err);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get request details",
        cause: err,
      });
    }
  });

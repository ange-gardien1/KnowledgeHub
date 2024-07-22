// import { TRPCError } from "@trpc/server";
// import { z } from "zod";
// import { protectedProcedure } from "../../trpc";
// import { notifications, editRequests } from "@/db/schema";
// import { db } from "@/db";
// import { sql, eq } from "drizzle-orm";

// export const approveEditRequest = protectedProcedure
//   .input(
//     z.object({
//       notificationId: z.string(),
//     })
//   )
//   .mutation(async ({ input: { notificationId }, ctx: { session } }) => {
//     if (!session?.user?.id) {
//       throw new TRPCError({
//         code: "UNAUTHORIZED",
//         message: "You must be logged in to approve an edit request",
//       });
//     }

//     try {
//       const [notification] = await db.select().from(notifications).where(eq(notifications.id, notificationId));
//       if (!notification) {
//         throw new TRPCError({
//           code: "NOT_FOUND",
//           message: "Notification not found",
//         });
//       }

//       // Update edit request status to approved
//       await db.update(editRequests)
//         .set({ status: 'approved' })
//         .where(eq(editRequests.documentId, notification.documentId))
//         .andWhere(eq(editRequests.userId, session.user.id));

//       // Delete the notification
//       await db.delete(notifications).where(eq(notifications.id, notificationId));

//       return { success: true };
//     } catch (err: any) {
//       console.log(err);
//       throw new TRPCError({
//         code: "INTERNAL_SERVER_ERROR",
//         message: "Failed to approve edit request",
//         cause: err,
//       });
//     }
//   });

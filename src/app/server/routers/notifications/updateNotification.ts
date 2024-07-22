// import { protectedProcedure } from "../../trpc";
// import { db } from "@/db";
// import { notifications } from "@/db/schema";
// import { z } from "zod";
// import { eq } from "drizzle-orm";

// export const markNotificationAsRead = protectedProcedure
//   .input(
//     z.object({
//       notificationId: z.string().uuid(), // Ensure it's a valid UUID
//     })
//   )
//   .mutation(async ({ input: { notificationId }, ctx }) => {
//     const userId = ctx.session?.user?.id;
//     if (!userId) {
//       throw new Error("User not found");
//     }

//     const updatedNotification = await db
//       .update(notifications)
//       .set({ read: true })
//       .where(eq(notifications.id, notificationId))
//       .returning();

//     if (updatedNotification.length === 0) {
//       throw new Error("Notification not found or not updated");
//     }

//     return updatedNotification[0];
//   });

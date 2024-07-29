import { protectedProcedure } from "../../trpc";
import { db } from "@/db";
import { notifications } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

export const getNotificationById = protectedProcedure
  .input(z.object({ notificationId: z.string() }))
  .query(async ({ ctx, input }) => {
    const { notificationId } = input;
    const userId = ctx.session?.user?.id;

    if (!userId) {
      throw new Error("User not found");
    }

    const notification = await db
      .select()
      .from(notifications)
      .where(
        // and(
          eq(notifications.id, notificationId),
        //   eq(notifications.userId, userId)
        // )
      )
    //   .limit(1);

    if (!notification) {
      throw new Error("Notification not found");
    }

    return notification[0];
  });

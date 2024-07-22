import { protectedProcedure } from "../../trpc";
import { db } from "@/db";
import { notifications } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export const getNotificationByStatus = protectedProcedure.query(
  async ({ ctx }) => {
    const userId = ctx.session?.user?.id;
    if (!userId) {
      throw new Error("User not found");
    }

    const statusNotifications = await db
      .select()
      .from(notifications)
      .where(
        and(eq(notifications.userId, userId), eq(notifications.read, false))
      );

    return statusNotifications;
  }
);

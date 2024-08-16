import { protectedProcedure } from "../../trpc";
import { db } from "@/db";
import { notifications } from "@/db/schema";
import { and, eq, or } from "drizzle-orm";

export const getNotificationByStatus = protectedProcedure.query(
  async ({ ctx }) => {
    const userId = ctx.session?.user?.id;
    if (!userId) {
      throw new Error("User not found");
    }

    const typeNotifications = await db
      .select()
      .from(notifications)
      .where(
        and(
          eq(notifications.userId, userId),
          or(
            eq(notifications.type, 'edit_request_approved'),
            eq(notifications.type, 'edit_request_denied')
          ),
          eq(notifications.read, false)
        )
      );

    return typeNotifications;
  }
);

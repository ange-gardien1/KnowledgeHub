import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import { db } from "@/db";
import { notifications } from "@/db/schema";
import { eq } from "drizzle-orm";

export const markNotificationAsRead = protectedProcedure.mutation(
  async ({ ctx }) => {
    const userId = ctx.session?.user?.id;
    if (!userId) {
      throw new Error("User not found");
    }
    const updateNotifications = await db
      .update(notifications)
      .set({ read: true })
      .where(eq(notifications.userId, userId))
      .returning();

    return updateNotifications;
  }
);

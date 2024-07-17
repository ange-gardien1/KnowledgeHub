import { protectedProcedure } from "../../trpc";
import { db } from "@/db";
import { notifications } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getNotificationByUserId = protectedProcedure.query(async({ctx}) => {
    const userId = ctx.session?.user?.id;
    if(!userId){
        throw new Error ("user not found");
    }
    const UserNotifications = await db.select().from(notifications).where(eq(notifications.userId, userId))
    return UserNotifications
})
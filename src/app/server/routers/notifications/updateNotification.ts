import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import { db } from "@/db";
import { notifications } from "@/db/schema";
import { eq } from "drizzle-orm";

export const markNotificationAsRead = protectedProcedure
.input(
    z.object({
        notificationId:z.string().uuid(),
    })
)
.mutation(async ({input : {notificationId}, ctx}) => {
    const userId = ctx.session?.user?.id;
    if(!userId){
        throw new Error("user not found");
    }
    const updateNotification = await db
    .update(notifications)
    .set({read:true})
    .where(eq(notifications.id, notificationId))
    .returning();

    if(updateNotification.length === 0){
        throw new Error("Notification not Found or not Updated");
    }
    return updateNotification[0];
})
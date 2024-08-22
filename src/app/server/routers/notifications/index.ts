import { router } from "../../trpc";
import { getNotificationByUserId } from "./getNotification";
import { getNotificationById } from "./getNotificationById";
import { getNotificationByStatus } from "./getNotificationByStatus";
import { markNotificationAsRead } from "./updateNotification";


export const notificationRouter = router({
   getNotification:getNotificationByUserId,
    getNotificationByStatus:getNotificationByStatus,
    markNotificationAsRead: markNotificationAsRead,
    getNotificationById:getNotificationById
})
import { router } from "../../trpc";
import { getNotificationByUserId } from "./getNotification";
import { getNotificationByStatus } from "./getNotificationByStatus";
// import { markNotificationAsRead } from "./updateNotification";

export const notificationRouter = router({
   getNotification:getNotificationByUserId,
    getNotificationByStatus:getNotificationByStatus,
    // markNotificationAsRead:markNotificationAsRead
})
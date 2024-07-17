import { router } from "../../trpc";
import { getNotificationByUserId } from "./getNotification";

export const getNotificationByUserIdRouter = router({
   getNotificationByUserId:getNotificationByUserId
    
})
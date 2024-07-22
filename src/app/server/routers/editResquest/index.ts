import { router } from "../../trpc";
import { createEditRequest } from "./addEditRequest";
import { getRequestDetailsByNotificationId } from "./getRequestByNotificationId";


export const RequestRouter = router({
    createEditRequest:createEditRequest,
    getRequestFromNotification: getRequestDetailsByNotificationId
})
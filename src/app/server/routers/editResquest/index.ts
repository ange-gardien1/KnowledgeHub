import { router } from "../../trpc";
import { createEditRequest } from "./addEditRequest";
import { approveEditRequest } from "./approveEditRequest";
import { getRequestDetailsByNotificationId } from "./getRequestByNotificationId";


export const RequestRouter = router({
    createEditRequest:createEditRequest,
    getRequestFromNotification: getRequestDetailsByNotificationId,
    approveEditRequest:approveEditRequest
})
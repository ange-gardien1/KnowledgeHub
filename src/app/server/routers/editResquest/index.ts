import { router } from "../../trpc";
import { createEditRequest } from "./addEditRequest";
import { approveEditRequest } from "./approveEditRequest";
import { rejectEditRequest } from "./denyEditRequest";
import { getEditRequestByUserId } from "./getEditRequestByUserId";
import { getRequestDetailsByNotificationId } from "./getRequestByNotificationId";
import { getAllEditRequestsFromUsers } from "./getUsersRequest";



export const RequestRouter = router({
    createEditRequest:createEditRequest,
    getRequestFromNotification: getRequestDetailsByNotificationId,
    approveEditRequest:approveEditRequest,
    denyEditRequest:rejectEditRequest,
    getAllEditRequest:getEditRequestByUserId,
    getMyRequest: getAllEditRequestsFromUsers
})
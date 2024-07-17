import { router } from "../../trpc";
import { createEditRequest } from "./addEditRequest";


export const createEditRequestRouter = router({
    createEditRequest:createEditRequest
    
})
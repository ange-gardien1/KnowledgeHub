import { router } from "../../trpc";
import { getGuestUsers } from "./getGuestUsers";
import { promoteToAdmin } from "./promoteGuestToAdmin";


export const GuestUsersRouter = router({
   getGuestUsers:getGuestUsers,
   promoteToAdmin:promoteToAdmin
})
import { router } from "../trpc";
import { getUsers } from "./users";


export const usersRouter = router({
    getAll: getUsers
    
})
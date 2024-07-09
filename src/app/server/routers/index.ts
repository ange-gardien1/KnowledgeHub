import { router } from "../trpc";
import { getAllUsers } from "./users";

export const usersRouter = router({
    getAll: getAllUsers
    
})
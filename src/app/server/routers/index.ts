import { router } from "../trpc";
import { getUsers, registerUser } from "./users";


export const usersRouter = router({
    getAll: getUsers,
    registerUser: registerUser
    
})
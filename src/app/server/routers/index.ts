import { router } from "../trpc";
import { getUsers, loginUser, registerUser } from "./users";


export const usersRouter = router({
    getAll: getUsers,
    registerUser: registerUser,
    loginuser:loginUser
})
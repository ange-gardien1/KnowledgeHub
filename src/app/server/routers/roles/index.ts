import { router } from "../../trpc";
import { getRoleNameById } from "./getRoleNameByRoleId";

export const roles = router({
 getMyRole: getRoleNameById
});

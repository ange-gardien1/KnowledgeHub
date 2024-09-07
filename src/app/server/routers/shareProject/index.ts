import { router } from "../../trpc";
import { getSharedProjects } from "./getSharedProject";
import { shareProject } from "./shareProject";

export const  shareprojectsRouter = router({
    addShares:shareProject,
    shareProject:getSharedProjects
})
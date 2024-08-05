import { router } from "../../trpc";
import { createProject } from "./createProject";
import { getProjectsByUserId } from "./getProjectsByUserId";

export const projectsRouter = router({
    createNewProject : createProject,
    getUserProjects: getProjectsByUserId
})
import { router } from "../../trpc";
import { createProject } from "./createProject";
import { deleteMyProjects } from "./deleteProject";
import { getProjectsByUserId } from "./getProjectsByUserId";

export const projectsRouter = router({
    createNewProject : createProject,
    getUserProjects: getProjectsByUserId,
    deleteMyProject: deleteMyProjects
})
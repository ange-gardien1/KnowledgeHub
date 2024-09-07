import { protectedProcedure } from "../../trpc";
import { db } from "@/db";
import { projectShares, projects } from "@/db/schema";
import { sql } from "drizzle-orm";

export const getSharedProjects = protectedProcedure.query(
  async ({ ctx }) => {
    const userId = ctx.session?.user?.id;

    if (!userId) {
      throw new Error("User ID not found in session");
    }

    const sharedProjects = await db
      .select({
        project: projects,
        projectShare: projectShares,
      })
      .from(projectShares)
      .innerJoin(projects, sql`${projectShares.projectId} = ${projects.id}`)
      .where(sql`${projectShares.sharedWithUserId} = ${userId}`);

    return sharedProjects.map(({ project, projectShare }) => ({
      projectId: project.id,
      name: project.name,
      description: project.description,
      createdAt: project.createdAt,
      permission: projectShare.permission, 
    }));
  }
);

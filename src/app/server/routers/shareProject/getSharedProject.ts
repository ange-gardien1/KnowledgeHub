import { protectedProcedure } from "../../trpc";
import { db } from "@/db";
import { projectShares, projects, documents } from "@/db/schema";
import { sql } from "drizzle-orm";

type Document = {
  documentId: string;
  title: string;
  content: string | null;
  pdfUrl: string | null;
};

type ProjectWithDocuments = {
  projectId: string;
  name: string;
  description: string | null;
  createdAt: Date;
  permission: string;
  documents: Document[];
};

export const getSharedProjects = protectedProcedure.query(async ({ ctx }) => {
  const userId = ctx.session?.user?.id;

  if (!userId) {
    throw new Error("User ID not found in session");
  }

  const sharedProjectsWithDocuments = await db
    .select({
      project: projects,
      projectShare: projectShares,
      document: documents,
    })
    .from(projectShares)
    .innerJoin(projects, sql`${projectShares.projectId} = ${projects.id}`)
    .leftJoin(documents, sql`${documents.projectId} = ${projects.id}`)
    .where(sql`${projectShares.sharedWithUserId} = ${userId}`);

  const groupedProjects = sharedProjectsWithDocuments.reduce<
    Record<string, ProjectWithDocuments>
  >((acc, { project, projectShare, document }) => {
    if (!acc[project.id]) {
      acc[project.id] = {
        projectId: project.id,
        name: project.name,
        description: project.description,
        createdAt: project.createdAt,
        permission: projectShare.permission,
        documents: [],
      };
    }
    if (document) {
      acc[project.id].documents.push({
        documentId: document.id,
        title: document.title,
        content: document.content,
        pdfUrl: document.pdfUrl,
      });
    }
    return acc;
  }, {});
  return Object.values(groupedProjects);
});

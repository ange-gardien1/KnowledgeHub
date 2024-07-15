import { protectedProcedure } from "../../trpc";
import { db } from "@/db";
import { resources, documents } from "@/db/schema";
import { sql } from "drizzle-orm";

export const getResourcesWithDocuments = protectedProcedure.query(async ({ ctx }) => {
  const userId = ctx.session?.user?.id;

  if (!userId) {
    throw new Error("User ID not found in session");
  }

  const resourcesWithDocuments = await db
    .select({
      resource: resources,
      document: documents,
    })
    .from(resources)
    .innerJoin(documents, sql`${resources.documentId} = ${documents.id}`)
    

  return resourcesWithDocuments.map(({ resource, document }) => ({
    resourceId: resource.id,
    documentId: resource.documentId,
    title: document.title,
    pdfUrl: document.pdfUrl,
    type: document.type,
    content: document.content,
    createdAt: resource.createdAt,
    updatedAt: resource.updatedAt,
  }));
});

// import { protectedProcedure } from "../../trpc";
// import { db } from "@/db";
// import { resources, documents, users } from "@/db/schema";
// import { sql } from "drizzle-orm";

// export const getResourcesWithDocuments = protectedProcedure.query(async ({ ctx }) => {
//   const userId = ctx.session?.user?.id;

//   if (!userId) {
//     throw new Error("User ID not found in session");
//   }

//   const resourcesWithDocuments = await db
//     .select({
//       resource: resources,
//       document: documents,
//       user: users
//     })
//     .from(resources)
//     .innerJoin(documents, sql`${resources.documentId} = ${documents.id}`)
//     .innerJoin(users, sql`${documents.userId} = ${users.id}`)
    

//   return resourcesWithDocuments.map(({ resource, document }) => ({
//     resourceId: resource.id,
//     documentId: resource.documentId,
//     title: document.title,
//     pdfUrl: document.pdfUrl,
//     type: document.type,
//     content: document.content,
//     createdAt: resource.createdAt,
//     updatedAt: resource.updatedAt,
//     userName:users.name
//   }));
// });


import { protectedProcedure } from "../../trpc";
import { db } from "@/db";
import { resources, documents, users } from "@/db/schema";
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
      userName: users.name, // Fetch the 'name' field from 'users'
    })
    .from(resources)
    .innerJoin(documents, sql`${resources.documentId} = ${documents.id}`)
    .innerJoin(users, sql`${documents.userId} = ${users.id}`);

  return resourcesWithDocuments.map(({ resource, document, userName }) => ({
    resourceId: resource.id,
    documentId: resource.documentId,
    title: document.title,
    pdfUrl: document.pdfUrl,
    type: document.type,
    content: document.content,
    createdAt: resource.createdAt,
    updatedAt: resource.updatedAt,
    userName: userName, // Ensure 'userName' is fetched correctly
  }));
});

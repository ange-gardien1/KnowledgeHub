import { db } from "@/db";
import { protectedProcedure } from "../../trpc";
import { documents } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";


const getDocumentsByProjectInput = z.object({
  projectId: z.string().uuid(),
});

export const getDocumentsByProject = protectedProcedure
  .input(getDocumentsByProjectInput)
  .query(async ({ ctx, input }) => {
    const userId = ctx.session?.user?.id;
    if (!userId) {
      throw new Error("User Not Found");
    }

 
    const documentsList = await db
      .select()
      .from(documents)
      .where(eq(documents.projectId, input.projectId));

    if (!documentsList.length) {
      throw new Error("No documents found for this project");
    }

    return documentsList;
  });



// import { db } from "@/db";
// import { protectedProcedure } from "../../trpc";
// import { documents, projects } from "@/db/schema"; // Import the projects table
// import { eq } from "drizzle-orm";
// import { z } from "zod";

// const getProjectWithDocumentsInput = z.object({
//   projectId: z.string().uuid(),
// });

// export const getProjectWithDocuments = protectedProcedure
//   .input(getProjectWithDocumentsInput)
//   .query(async ({ ctx, input }) => {
//     const userId = ctx.session?.user?.id;
//     if (!userId) {
//       throw new Error("User Not Found");
//     }

//     // Fetch project details
//     const project = await db
//       .select()
//       .from(projects)
//       .where(eq(projects.id, input.projectId))
//       .limit(1);

//     if (!project.length) {
//       throw new Error("Project not found");
//     }

//     // Fetch associated documents
//     const documentsList = await db
//       .select()
//       .from(documents)
//       .where(eq(documents.projectId, input.projectId));

//     return {
//       project: project[0], // Since we used limit(1)
//       documents: documentsList,
//     };
//   });

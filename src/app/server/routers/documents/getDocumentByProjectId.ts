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

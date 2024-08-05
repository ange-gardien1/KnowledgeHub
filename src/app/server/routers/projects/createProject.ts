import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { sql } from "drizzle-orm";

const createProjectSchema = z.object({
  name: z.string().min(1, "Project name is required").max(255, "Project name is too long"),
});

export const createProject = protectedProcedure
  .input(createProjectSchema) 
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session?.user?.id;

    if (!userId) {
      throw new Error("User ID not found in session");
    }

    const { name } = input;

    try {
      await db.insert(projects).values({
        id: sql`gen_random_uuid()`,
        userId,
        name,
        createdAt: sql`now()`,
        updatedAt: sql`now()`, 
      });
      return { success: true };
    } catch (error) {
      console.error("Error creating project:", error);
      throw new Error("Failed to create project");
    }
  });

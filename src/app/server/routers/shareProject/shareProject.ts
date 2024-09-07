import { db } from "@/db";
import { protectedProcedure } from "../../trpc";
import { projectShares, resources } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { z } from "zod";

export const shareProject = protectedProcedure
  .input(
    z.object({
      projectId: z.string().uuid(),
      sharedWithUserId: z.string().uuid(),
      permission: z.enum(["view", "comment", "edit"]).default("view"),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const sharedByUserId = ctx.session?.user?.id;

    if (!sharedByUserId) {
      throw new Error("User ID not found in session");
    }

    await db.insert(projectShares).values({
      id: sql`gen_random_uuid()`,
      projectId: input.projectId,
      sharedByUserId,
      sharedWithUserId: input.sharedWithUserId,
      permission: input.permission,
      createdAt: sql`now()`,
    });

    return { success: true };
  });

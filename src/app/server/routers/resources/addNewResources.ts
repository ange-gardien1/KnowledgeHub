import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import { db } from "@/db";
import { resources } from "@/db/schema";
import { sql } from "drizzle-orm";

export const createResource = protectedProcedure
  .input(z.object({
    title: z.string().max(255),
    url: z.string().url().optional(),
    type: z.string().max(10),
    description: z.string().optional(),
  }))
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session?.user?.id;

    if (!userId) {
      throw new Error("User ID not found in session");
    }

    await db.insert(resources).values({
      id: sql`gen_random_uuid()`,
      userId,
      title: input.title,
      url: input.url ?? null, 
      type: input.type,
      description: input.description ?? null,
      createdAt: sql`now()`,
      updatedAt: sql`now()`,
    });

    return { success: true };
  });

import { db } from "@/db";
import { protectedProcedure } from "../../trpc";
import { resources } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getResourcesByType = protectedProcedure.query(
  async ({ ctx }) => {
    const userId = ctx.session?.user?.id;

    if (!userId) {
      throw new Error("User ID not found in session");
    }


    const resourcesByType = await db
      .select()
      .from(resources)
      .where(eq(resources.type, "link"));

    return resourcesByType.map(resource => ({
      title: resource.title,
      url: resource.url,
      type: resource.type,
      description: resource.description,
      createdAt: resource.createdAt,
      updatedAt: resource.updatedAt,
      userId: resource.userId, 
    }));
  }
);

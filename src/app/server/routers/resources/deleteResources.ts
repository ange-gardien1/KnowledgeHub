import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";
import { resources } from "@/db/schema";
import { eq } from "drizzle-orm";

export const deletereMyResources = protectedProcedure
.input(z.object({
    id: z.string(),
}))
.mutation(async ({input:{id}, ctx: {session}}) => {
    if(!session?.user?.id){
        throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "you must logged in to delete a document",
        });
    }
    try {
        const deletedResource = await db
        .delete(resources)
        .where(eq(resources.id, id))
        .returning();
        if (deletedResource.length === 0) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Document not found",
          });
        }
        return { resource: deletedResource[0] };
      } catch (err: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete document",
          cause: err,
        });
      }
    });
  
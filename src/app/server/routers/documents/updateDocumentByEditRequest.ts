import { any, z } from "zod";
import { protectedProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";
import { documents, editRequests } from "@/db/schema";
import { eq } from "drizzle-orm";

export const updateDocucmentByEditRequestApproved = protectedProcedure
  .input(
    z.object({
      id: z.string(),
      title: z.string(),
      content: z.string(),
      type: z.enum(["text"]).optional(),
    })
  )
  .mutation(
    async ({ input: { id, title, content, type }, ctx: { session } }) => {
      if (!session?.user?.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "you must be logged in to access this document",
        });
      }
      try {
        const updateData: any = {
          updatedAt: new Date(),
        };
        if (title! == undefined) updateData.title = title;
        if (content! == undefined) updateData.content = content;
        if (type! == undefined) updateData.type = type;

        const updatedEditRequest = await db
          .update(editRequests)
          .set(updateData)
          .where(eq(documents.id, id))
          .returning();

        //    return {document: updateDocucmentByEditRequestApproved};
      } catch (err: any) {
        console.log(err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to updace check your access",
          cause: err,
        });
      }
    }
  );

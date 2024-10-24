import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import { documents } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";

export const updateDocument = protectedProcedure
  .input(
    z.object({
      id: z.string(),
      title: z.string().optional(),
      content: z.string().optional(),
      type: z.enum(["pdf", "text"]).optional(),
      pdfUrl: z.string().optional(),
    })
  )
  .mutation(async ({ input: { id, title, content, type, pdfUrl }, ctx: { session } }) => {
    if (!session?.user?.id) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to update a document",
      });
    }

    try {
      const updateData: any = {
        updatedAt: new Date(),
      };

      if (title !== undefined) updateData.title = title;
      if (content !== undefined) updateData.content = content;
      if (type !== undefined) updateData.type = type;
      if (pdfUrl !== undefined) updateData.pdfUrl = pdfUrl;

      const updatedDocument = await db
        .update(documents)
        .set(updateData)
        .where(eq(documents.id, id)) 
        .returning();

      return { document: updatedDocument };
    } catch (err: any) {
      console.log(err);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update document",
        cause: err,
      });
    }
  });


  // import { z } from "zod";
// import { protectedProcedure } from "../../trpc";
// import { TRPCError } from "@trpc/server";
// import { db } from "@/db";
// import { editRequests } from "@/db/schema";

// export const updateDocumentByEditRequest = protectedProcedure
// .input(
//     z.object({
//         id:z.string(),
//         title: z.string().optional(),
//         content: z.string().optional(),
//         type: z.enum(["pdf","text"]).optional(),
//         pdfUrl:z.string().optional(),
//     })
// )
// .mutation(async ({input: {id, title, content, type, pdfUrl}, ctx: {session}}) => {
//     if(!session?.user?.id){
//         throw new TRPCError({
//             code: "UNAUTHORIZED",
//             message: "You must be approved to update the document"
//         });
//     }
//     try{
//         const updateData: any = {
//             updatedAt: new Date(),
//         };
//         if( title! == undefined) updateData.title = title;
//         if( content! == undefined) updateData.content = content;
//         if( type !== undefined) updateData.type = type;
//         if(pdfUrl !== undefined) updateData.pdfUrl = pdfUrl;

//         const updatedEditRequest = await db
//         .update(editRequests)
//         .set(updateData)
//         .where
//     }
// })
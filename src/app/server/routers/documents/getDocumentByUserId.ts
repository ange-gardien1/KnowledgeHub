import { db } from "@/db";
import { protectedProcedure } from "../../trpc";
import { documents } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getDocumentsByUserId = protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user?.id;
   if(!userId){
    throw new Error("User Not Found");
   }

const Userdocuments = await db.select().from(documents).where(eq(documents.userId, userId))

  return Userdocuments;
});

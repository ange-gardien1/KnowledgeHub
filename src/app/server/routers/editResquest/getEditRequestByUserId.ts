import { db } from "@/db";
import { protectedProcedure } from "../../trpc";
import { documents, editRequests } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getEditRequestByUserId = protectedProcedure.query(async({ctx}) => {
const userId = ctx.session?.user?.id;
if(!userId){
    throw new Error( "user Not Found");
}
 const getAllRequestByUserId = await db
 .select()
 .from(editRequests)
 .where(eq(editRequests.userId, userId));
 return getAllRequestByUserId;
})
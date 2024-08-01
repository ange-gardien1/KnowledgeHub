import { db } from "@/db";
import { protectedProcedure } from "../../trpc";
import { documents } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export const getPdfDocumentsByUserId = protectedProcedure.query(async({ctx}) => {
    const userId = ctx.session?.user?.id;
    if(!userId){
        throw new Error("user not found");
    }
 
const UserPdfDocuments = await db
.select()
.from(documents)
.where(
    and(
        eq(documents.userId, userId),
        eq(documents.type, 'pdf')
    )
);
return UserPdfDocuments;
});
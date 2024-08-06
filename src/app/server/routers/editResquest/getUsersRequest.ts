import { db } from "@/db";
import { protectedProcedure } from "../../trpc";
import { users, editRequests, documents } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getAllEditRequestsFromUsers = protectedProcedure.query(async ({ ctx }) => {
  const userId = ctx.session?.user?.id;
  if (!userId) {
    throw new Error("User Not Found");
  }

  const requests = await db
    .select({
      id: editRequests.id,
      documentId: documents.id,
      documentTitle: documents.title,
      requesterId: editRequests.userId,
      requesterName: users.name, 
      requestStatus: editRequests.status,
      requestType: editRequests.requestType,
      requestDate: editRequests.createdAt,
    })
    .from(editRequests)
    .innerJoin(documents, eq(editRequests.documentId, documents.id))
    .innerJoin(users, eq(editRequests.userId, users.id))
    .where(eq(documents.userId, userId)) 
    .execute();

  if (requests.length === 0) {
    return []; 
  }

  return requests;
});

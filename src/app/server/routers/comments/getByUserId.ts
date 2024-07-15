import { protectedProcedure } from "../../trpc";
import { db } from "@/db";
import { comments } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getCommentsByUserId = protectedProcedure.query(async ({ ctx }) => {
  const userId = ctx.session?.user?.id;

  if (!userId) {
    throw new Error("User ID not found in session");
  }

  const userComments = await db.select().from(comments).where(eq(comments.userId, userId));

  return userComments;
});

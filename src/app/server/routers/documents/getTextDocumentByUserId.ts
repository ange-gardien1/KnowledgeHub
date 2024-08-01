import { db } from "@/db";
import { protectedProcedure } from "../../trpc";
import { documents } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export const getTextDocumentByUserId = protectedProcedure.query(
  async ({ ctx }) => {
    const userId = ctx.session?.user?.id;
    if (!userId) {
      throw new Error("user Not Found");
    }
    const UserTextDocument = await db
      .select()
      .from(documents)
      .where(and(eq(documents.userId, userId), eq(documents.type, "text")));
    return UserTextDocument;
  }
);

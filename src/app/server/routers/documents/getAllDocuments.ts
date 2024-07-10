import { db } from "@/db";
import { protectedProcedure } from "../../trpc";
import { documents } from "@/db/schema";

export const getAllDocuments = protectedProcedure.query(async () => {
  const document = await db.select().from(documents);
  return document;
});

import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import { error } from "console";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { sql } from "drizzle-orm";

export const createProject = protectedProcedure
.mutation(async({ctx}) => {
    const userId = ctx.session?.user?.id;
    if(!userId){
        throw new Error("User Id not found in session");
    }

    await db.insert(projects).values({
        id: sql`gen_random_uuid()`,
        userId,
        createdAt:sql`now(),`
    })
})
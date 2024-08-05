import { projects } from "@/db/schema";
import { protectedProcedure } from "../../trpc";
import { eq } from "drizzle-orm";
import { db } from "@/db";

export const getProjectsByUserId = protectedProcedure.query(async({ctx}) => {
    const userId = ctx.session?.user?.id;
    if(!userId){
        throw new Error("User not Found");
    }
    const UserProjects = await db.select().from(projects).where(eq(projects.userId, userId))
    return UserProjects;
})
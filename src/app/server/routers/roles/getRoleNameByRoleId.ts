// src/server/routers/role.ts
import { db } from "@/db";
import { protectedProcedure } from "../../trpc";
import { roles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod"; // Import zod for input validation

export const getRoleNameById = protectedProcedure
  .input(z.string().uuid()) // Validate the input as a UUID string
  .query(async ({ input, ctx }) => {
    const userId = ctx.session?.user?.id;

    if (!userId) {
      throw new Error("User ID not found in session");
    }

    // Fetch the role by roleId
    const role = await db
      .select()
      .from(roles)
      .where(eq(roles.id, input))
      .limit(1); // We only expect one role per ID

    if (!role.length) {
      throw new Error("Role not found");
    }

    // Return the role name
    return role[0].name;
  });

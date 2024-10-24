import { db } from "@/db";

import { users } from "@/db/schema";
import { eq, not, or, isNull } from "drizzle-orm/expressions";
import { protectedProcedure } from "../../trpc";


export const getGuestUsers = protectedProcedure.query(async () => {
  const excludedRoleId = "8f6d6f9e-36d6-4db1-8f6a-c1a0dfcc8a72";

  const usersWithGuestOrOtherRoles = await db
    .select({
      id: users.id,
      username: users.name,
      roleId: users.roleId,
    })
    .from(users)
    .where(or(isNull(users.roleId), not(eq(users.roleId, excludedRoleId))));

  return usersWithGuestOrOtherRoles;
});

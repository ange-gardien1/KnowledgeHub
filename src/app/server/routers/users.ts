import { db } from "@/db";
import { protectedProcedure, publicProcedure } from "../trpc";
import { users } from "@/db/schema";
// import bcrypt from "bcryptjs";
// import { z } from "zod";

export const getUsers = protectedProcedure.query(async () => {
    const Users = await db.select({
      id: users.id,
      username: users.name,
      roleId:users.name,  
    }).from(users);
  
    return Users; 
});




// // Define the user registration procedure
// export const registerUser = protectedProcedure
//   .input(
//     z.object({
//       name: z.string().min(1, "Name is required"),
//       email: z.string().email("Invalid email address"),
//       password: z.string().min(6, "Password should be at least 6 characters"),
//       roleId: z.string().uuid(), // Assuming roleId is passed as a string (UUID)
//     })
//   )
//   .mutation(async ({ input }) => {
//     const { name, email, password, roleId } = input;

//     // Check if the email already exists
//     const existingUser = await db.select().from(users).where(users.email, email).first();
//     if (existingUser) {
//       throw new Error("User with this email already exists");
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Insert new user into the database
//     try {
//       const newUser = await db.insert(users).values({
//         name: name, // Explicitly pass as string
//         email: email, // Explicitly pass as string
//         password: hashedPassword, // Hash password
//         roleId: roleId, // Ensure roleId is UUID (string)
//         emailVerified: null, // Explicitly set to null
//         image: null, // Explicitly set to null
//       });

//       return newUser;
//     } catch (error) {
//       console.error("Error inserting user:", error);
//       throw new Error("Failed to register user");
//     }
//   });
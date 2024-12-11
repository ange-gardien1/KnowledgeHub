import { z } from "zod";

export const registersSchema = z.object({
    name: z.string().trim().min(3, "Required"),
    email: z.string().trim().email(),
    password: z.string().min(8, "Minimum 8 characters"),
  });
  
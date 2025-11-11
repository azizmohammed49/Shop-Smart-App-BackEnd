import { z } from "zod";

export const registerUserSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long!"),
  email: z.email("Invalid email address!"),
  password: z.string().min(6, "Password must be atleast 6 characters long!"),
});

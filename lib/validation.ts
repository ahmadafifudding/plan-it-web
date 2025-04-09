import { z } from "zod";

export const authSchema = z.object({
  name: z.string().min(4, {
    message: "Name must be at least 4 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

export const todoSchema = z.object({
  title: z.string().min(4, {
    message: "Title must be at least 4 characters",
  }),
});

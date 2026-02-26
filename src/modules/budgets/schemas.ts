import { create } from "domain";
import { z } from "zod";

export const budgetInsertSchema = z.object({
  name: z.string().min(1, "Name is required"),
  amount: z.string().min(1, "Amount is required"), // Changed to string to allow decimal input
  icon: z.string().optional(),
});

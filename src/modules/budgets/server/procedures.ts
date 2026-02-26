import { db } from "@/db";
import { budgets } from "@/db/schema";
import {
  createTRPCRouter,
  baseProcedure,
  protectedProcedure,
} from "@/trpc/init";
import { budgetInsertSchema } from "../schemas";
import z from "zod";
import { eq } from "drizzle-orm";

export const budgetsRouter = createTRPCRouter({
  getOne: baseProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const [existingBudget] = await db
        .select()
        .from(budgets)
        .where(eq(budgets.id, input.id));
      return existingBudget;
    }),
  getMany: baseProcedure
    .query(async ({ ctx }) => {
      const data = await db.select().from(budgets);
      return data;
    }),
  create: protectedProcedure
    .input(budgetInsertSchema)
    .mutation(async ({ input, ctx }) => {
      console.log("Creating budget with input:", input);
      const [createdBudget] = await db
        .insert(budgets)
        .values({
          ...input,
          userId: ctx.auth.user.id,
        })
        .returning();

      return createdBudget;
    }),
});

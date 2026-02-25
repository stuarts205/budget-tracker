import { db } from "@/db";
import { budgets } from "@/db/schema";
import { createTRPCRouter, baseProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";

export const budgetsRouter = createTRPCRouter({
    getMany: baseProcedure.query(async ({ ctx }) => {
        const data = await db
        .select()
        .from(budgets);

        //await new Promise((resolve) => setTimeout(resolve, 5000));
        //throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to fetch users" });

        return data;
    })
})
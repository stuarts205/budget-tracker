import { db } from "@/db";
import { user } from "@/db/schema";
import { createTRPCRouter, baseProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";

export const usersRouter = createTRPCRouter({
    getMany: baseProcedure.query(async ({ ctx }) => {
        const data = await db
        .select()
        .from(user);

        //await new Promise((resolve) => setTimeout(resolve, 5000));
        //throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to fetch users" });

        return data;
    })
})
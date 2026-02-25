import { budgets } from '@/db/schema';
import { createTRPCRouter } from '../init';
import { usersRouter } from '@/modules/users/server/procedures';
import { budgetsRouter } from '@/modules/budgets/server/procedures';


export const appRouter = createTRPCRouter({
    users: usersRouter,
    budgets: budgetsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
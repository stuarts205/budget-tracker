import { inferRouterOutputs } from "@trpc/server"
import type { AppRouter } from "@/trpc/routers/_app"

export type BudgetGetMany = inferRouterOutputs<AppRouter>['budgets']['getMany'];
export type BudgetGetOne = inferRouterOutputs<AppRouter>['budgets']['getOne'];
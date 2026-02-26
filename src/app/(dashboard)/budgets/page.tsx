import {
  BudgetsViewError,
  BudgetsViewLoading,
  BudgetsView,
} from "@/modules/budgets/ui/views/budgets-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { BudgetsListHeader } from "@/modules/budgets/ui/components/budgets-list-header";

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.budgets.getMany.queryOptions());

  return (
    <>
      <BudgetsListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<BudgetsViewLoading />}>
          <ErrorBoundary fallback={<BudgetsViewError />}>
            <BudgetsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default Page;

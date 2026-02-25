'use client'
import { ErrorState } from '@/components/error-state';
import { LoadingState } from '@/components/loading-state';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';

export const BudgetsView = () => {
 const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.budgets.getMany.queryOptions(),
  );

  return (
    <div>
      {JSON.stringify(data, null, 2)}
    </div>
  )
}

export const BudgetsViewLoading = () => {
  return (
    <LoadingState
      title="Loading budgets"
      description="Please wait while we fetch the budget list."
    />
  );
};

export const BudgetsViewError = () => {
  return (
    <ErrorState
      title="Error loading budgets"
      description="There was an error fetching the budget list. Please try again."
    />
  );
};

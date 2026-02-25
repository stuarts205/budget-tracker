"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";

export const UserView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.users.getMany.queryOptions(),
  );

  return (
    <div>
      {JSON.stringify(data, null, 2)}
    </div>
  )
};

export const UsersViewLoading = () => {
  return (
    <LoadingState
      title="Loading users"
      description="Please wait while we fetch the user list."
    />
  );
};

export const UsersViewError = () => {
  return (
    <ErrorState
      title="Error loading users"
      description="There was an error fetching the user list. Please try again."
    />
  );
};

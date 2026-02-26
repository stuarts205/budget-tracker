"use client";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { NewBudgetDialog } from "../components/new-budget-dialog";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

export const BudgetsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.budgets.getMany.queryOptions());
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <NewBudgetDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card
            onClick={() => setIsDialogOpen(true)}
            className="
                bg-slate-100 
                border-2 border-dashed 
                cursor-pointer 
                hover:shadow-md 
                transition-shadow
              "
          >
            <CardContent className="p-10 flex flex-col items-center justify-center">
              <h2 className="text-3xl">
                <PlusIcon className="h-8 w-8" />
              </h2>
              <p className="text-sm mt-2">Create a new budget</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

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

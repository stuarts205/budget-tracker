"use client";
import React from "react";
import { BudgetGetOne } from "../../types";
import { useTRPC } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { budgetInsertSchema } from "../../schemas";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface BudgetFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: BudgetGetOne;
  emoji?: string;
}

export const BudgetForm = ({
  onSuccess,
  onCancel,
  initialValues,
  emoji,
}: BudgetFormProps) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const createBudget = useMutation(
    trpc.budgets.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.budgets.getMany.queryOptions(),
        );
        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.budgets.getOne.queryOptions({ id: initialValues.id }),
          );
        } 
        toast.success("Budget created successfully!");
        onSuccess?.();
      },
      onError: () => {
        toast.error("Failed to create budget. Please try again.");
      },
    }),
  );

  const form = useForm<z.infer<typeof budgetInsertSchema>>({
    resolver: zodResolver(budgetInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      amount: initialValues?.amount ?? "",
      icon: emoji ?? "",
    },
  });

  const isEdit = !!initialValues?.id;
  const isPending = createBudget.isPending;

  const onSubmit = (values: z.infer<typeof budgetInsertSchema>) => {
    values.icon = emoji ?? values.icon;
    if (isEdit) {
      console.log("Edit budget", values);
    } else {
      createBudget.mutate(values);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">        
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. House Paymnet"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="e.g. 100.00"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between gap-x-2">
          {onCancel && (
            <Button
              variant="ghost"
              disabled={isPending}
              type="button"
              onClick={onCancel}
              className="cursor-pointer"
            >
              Cancel
            </Button>
          )}
          <Button disabled={isPending} type="submit" className="cursor-pointer">
            {isEdit ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

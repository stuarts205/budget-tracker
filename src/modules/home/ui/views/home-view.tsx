"use client";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export const HomeView = () => {
  const trpc = useTRPC();
  const { data } = useQuery(
    trpc.hello.queryOptions({ text: "from tRPC" }),
  )
  return (
    <div>
        {data?.greeting}
    </div>
  )
};

import { CommandDialog, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useState } from "react";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { CommandEmpty } from "cmdk";

interface DashboardCommandProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}


export const DashboardCommand = ({ open, setOpen }: DashboardCommandProps) => {
  

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search.." />
      <CommandList>
        <CommandItem>
          Test
        </CommandItem>
      </CommandList>
    </CommandDialog>
  );
};

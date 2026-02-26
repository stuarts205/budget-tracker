"use client";
import React, { useState } from "react";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { BudgetForm } from "./budget-form";
import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";

interface NewBudgetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewBudgetDialog = ({
  open,
  onOpenChange,
}: NewBudgetDialogProps) => {
  const [selectedEmoji, setSelectedEmoji] = useState<string>("💰");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);  
  
  return (
    <ResponsiveDialog
      title="New Budget"
      description="Create a new budget"
      open={open}
      onOpenChange={onOpenChange}
    >
      <div className="mb-4">
        <Button
          type="button"
          variant="outline"
          className="h-auto w-fit p-2 inline-flex items-center justify-center cursor-pointer"
          onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
        >
          <span className="text-3xl leading-none">{selectedEmoji}</span>
        </Button>
      </div>
      <div className="absolute">
        <EmojiPicker
          open={openEmojiPicker}
          onEmojiClick={(e) => {
            setSelectedEmoji(e.emoji);
            setOpenEmojiPicker(false);
          }}
        />
      </div>
      <BudgetForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        emoji={selectedEmoji}
      />
    </ResponsiveDialog>
  );
};

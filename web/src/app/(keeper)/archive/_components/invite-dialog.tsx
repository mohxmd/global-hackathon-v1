"use client";

import * as React from "react";
import { CheckIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { toast } from "sonner";
import { User } from "@/data/user/get-users";

type InviteDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  users: User[];
};

export function InviteDialog({ open, setOpen, users }: InviteDialogProps) {
  const [selected, setSelected] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);

  const handleInvite = async () => {
    if (selected.length === 0) return;

    setLoading(true);
    try {
      toast.success("Invitations sent successfully!");
      setOpen(false);
    } catch (err) {
      toast.error("Failed to send invitations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[85%] flex flex-col">
        <DialogHeader>
          <DialogTitle>Invite Companions</DialogTitle>
          <DialogDescription>
            Select users to invite to your Haven.
          </DialogDescription>
        </DialogHeader>

        <Command className="overflow-hidden rounded-t-none border-t bg-transparent">
          <CommandInput placeholder="Search user..." />
          <CommandList>
            <CommandEmpty>No users found.</CommandEmpty>
            <CommandGroup>
              {users.map((u) => (
                <CommandItem
                  key={u.id}
                  onSelect={() => {
                    setSelected((prev) =>
                      prev.includes(u.id)
                        ? prev.filter((id) => id !== u.id)
                        : [...prev, u.id]
                    );
                  }}
                  className="flex items-center gap-2"
                >
                  <Avatar className="size-8 border">
                    <AvatarImage src={u.image ?? ""} />
                    <AvatarFallback>{u.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium">{u.name}</p>
                    <p className="text-muted-foreground text-xs">{u.email}</p>
                  </div>
                  {selected.includes(u.id) && (
                    <CheckIcon className="ml-auto size-4 text-primary" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>

        <DialogFooter className="border-t pt-4">
          <Button
            onClick={handleInvite}
            disabled={selected.length === 0 || loading}
            className="ml-auto"
          >
            {loading
              ? "Sending..."
              : `Invite ${selected.length || ""} ${
                  selected.length === 1 ? "user" : "users"
                }`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

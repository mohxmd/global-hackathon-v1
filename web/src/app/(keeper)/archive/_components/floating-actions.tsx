"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EchoCreateSheet } from "./echo-create-form";
import { InviteDialog } from "./invite-dialog";
import { User } from "@/data/user/get-users";

export function FloatingActions({ users }: { users: User[] }) {
  const [openInvite, setOpenInvite] = React.useState(false);

  return (
    <>
      <div className={cn("fixed bottom-6 left-1/2 -translate-x-1/2 z-50")}>
        <div className="flex items-center justify-center gap-2 rounded-full border bg-background/95 backdrop-blur-sm p-2 shadow-lg">
          <EchoCreateSheet>
            <Button className="rounded-full">Add Echo</Button>
          </EchoCreateSheet>

          <Button
            onClick={() => setOpenInvite(true)}
            variant="secondary"
            className="rounded-full"
          >
            Invite
          </Button>

          <Button asChild variant="ghost" className="rounded-full">
            <Link href={"/settings"}>⚙️ Settings</Link>
          </Button>
        </div>
      </div>

      <InviteDialog open={openInvite} setOpen={setOpenInvite} users={users} />
    </>
  );
}

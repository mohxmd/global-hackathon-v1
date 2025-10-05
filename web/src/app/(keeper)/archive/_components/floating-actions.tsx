import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EchoCreateSheet } from "./echo-create-form";

type FloatingActionsProps = {
  inviteHref?: string;
  settingsHref?: string;
  className?: string;
};

export function FloatingActions({
  inviteHref = "/invite",
  settingsHref = "/settings",
  className,
}: FloatingActionsProps) {
  return (
    <div
      className={cn(
        "absolute bottom-6 left-1/2 -translate-x-1/2 z-50",
        className
      )}
    >
      <div className="flex items-center justify-center gap-2 rounded-full border bg-background/95 backdrop-blur-sm p-2 shadow-lg">
        <EchoCreateSheet>
          <Button className="rounded-full">Add Echo</Button>
        </EchoCreateSheet>

        <Button asChild variant="secondary" className="rounded-full">
          <Link href={inviteHref}>Invite</Link>
        </Button>
        <Button asChild variant="ghost" className="rounded-full">
          <Link href={settingsHref}>⚙️ Settings</Link>
        </Button>
      </div>
    </div>
  );
}

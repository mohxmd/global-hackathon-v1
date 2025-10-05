import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FloatingActionsProps = {
  addHref?: string;
  inviteHref?: string;
  settingsHref?: string;
  className?: string;
};

export function FloatingActions({
  addHref = "/echo/new",
  inviteHref = "/invite",
  settingsHref = "/settings",
  className,
}: FloatingActionsProps) {
  return (
    <div
      className={cn("fixed bottom-6 left-1/2 -translate-x-1/2 z-50", className)}
    >
      <div className="flex items-center justify-center gap-2 rounded-full border bg-background/95 backdrop-blur-sm p-2 shadow-lg">
        <Button asChild className="rounded-full">
          <Link href={addHref}>＋ Add Echo</Link>
        </Button>
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

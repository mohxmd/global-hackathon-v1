import { Users } from "lucide-react";

export function FeatureSharedHavens() {
  return (
    <div className="border md:border-0 md:border-r">
      <div className="p-6 sm:p-12">
        <span className="text-muted-foreground flex items-center gap-2">
          <Users className="size-4" /> Private Memory Spaces
        </span>

        <p className="mt-8 text-2xl font-semibold">
          Create your own shared haven — invite friends and family to collect
          moments together.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Each haven keeps your group’s memories in one safe, private space —
          photos, stories, and milestones.
        </p>
      </div>

      <div aria-hidden className="border-t p-6 sm:p-12 bg-muted/20">
        <p className="text-sm text-muted-foreground">
          “We use Memory Keeper to save all our college memories — it feels like
          our own little time capsule.”
        </p>
        <p className="mt-2 text-xs text-right text-muted-foreground">
          — Mohammed & Friends 🎓
        </p>
      </div>
    </div>
  );
}

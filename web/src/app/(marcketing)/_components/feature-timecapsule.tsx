import { Clock, Sparkles } from "lucide-react";

export function FeatureTimeCapsule() {
  return (
    <div className="relative col-span-full border-t md:border-0 md:border-l">
      <div className="p-6 sm:p-12">
        <span className="text-muted-foreground flex items-center gap-2">
          <Clock className="size-4" /> Time Capsules
        </span>

        <p className="my-8 text-2xl font-semibold">
          Lock a memory for the future — and let it surprise you one day.
        </p>
        <p className="text-sm text-muted-foreground">
          Add a date and hide your memory until then. A small gift to your
          future self.
        </p>
      </div>

      <div className="border-t bg-muted/20 p-6 sm:p-12">
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Sparkles className="size-4 text-yellow-500" /> “Your 2025 Memories
          Capsule unlocks in 34 days.”
        </p>
      </div>
    </div>
  );
}

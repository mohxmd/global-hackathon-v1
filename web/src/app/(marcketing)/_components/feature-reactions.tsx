import { Heart } from "lucide-react";

export function FeatureReactions() {
  return (
    <div className="overflow-hidden border-t bg-zinc-50 p-6 sm:p-12 md:border-0 md:border-l dark:bg-transparent">
      <span className="text-muted-foreground flex items-center gap-2">
        <Heart className="size-4" /> Reactions and Stories
      </span>

      <p className="my-8 text-2xl font-semibold">
        Relive emotions with your circle — react, comment, and share your
        favorite memories.
      </p>
      <p className="text-sm text-muted-foreground">
        Because memories are better when felt together 💫
      </p>

      <div aria-hidden className="flex flex-col gap-6 mt-8 text-xs">
        <div className="border rounded-xl bg-background p-3 w-4/5">
          “This picture brings back the best weekend ever 😍”
        </div>
        <div className="border rounded-xl bg-blue-600 text-white p-3 w-3/5 ml-auto">
          “Agreed! Let’s plan another one soon!”
        </div>
      </div>
    </div>
  );
}

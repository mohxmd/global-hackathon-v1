import { Skeleton } from "@/components/ui/skeleton";

export function HavenTopBarSkeleton() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="size-8 rounded-full" />
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-40" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-24 rounded-full" />
          </div>
        </div>
      </div>
    </header>
  );
}

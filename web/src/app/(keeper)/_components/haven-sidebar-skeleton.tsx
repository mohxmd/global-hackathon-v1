import { Skeleton } from "@/components/ui/skeleton";

export function HavenSidebarSkeleton() {
  return (
    <div className="h-full border-r bg-background">
      <div className="flex flex-col h-full">
        <div className="p-4 border-b">
          <Skeleton className="h-6 w-20" />
        </div>

        <div className="flex-1 overflow-y-auto">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-full flex items-center gap-3 p-3">
              <Skeleton className="h-12 w-12 rounded-full shrink-0" />
              <div className="flex-1 min-w-0 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

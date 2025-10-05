import { EchoGridSkeleton } from "./_components/echo-grid-skeleton";
import { HavenSidebarSkeleton } from "./_components/haven-sidebar-skeleton";

export default function Loading() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,1fr)] lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">
      <div className="order-1 lg:order-none">
        <HavenSidebarSkeleton />
      </div>

      <section aria-label="Echo Feed" className="min-w-0">
        <EchoGridSkeleton />
      </section>
    </div>
  );
}

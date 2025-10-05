import { Suspense } from "react";
import { HavenTopBar } from "./_components/header";
import { FloatingActions } from "./_components/floating-actions";
import { HavenTopBarSkeleton } from "./_components/haven-topbar-skeleton";

export default async function ArchiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Suspense fallback={<HavenTopBarSkeleton />}>
        <HavenTopBar />
      </Suspense>

      <main className="flex-1 relative overflow-y-auto">{children}</main>
    </div>
  );
}

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
    <div className="min-h-[100svh]">
      <Suspense fallback={<HavenTopBarSkeleton />}>
        <HavenTopBar />
      </Suspense>

      <main className="w-full h-full">
        {children}

        <FloatingActions
          addHref="/echo/new"
          inviteHref="/invite"
          settingsHref="/settings"
        />
      </main>
    </div>
  );
}

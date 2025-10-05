"use client";

import { useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { UserHaven } from "@/data/havens/get-havens";
import { setActiveHaven } from "../../_actions/haven";

type HavenSidebarProps = {
  havens: UserHaven[];
  activeId: string;
};

export function HavenSidebar({ havens, activeId }: HavenSidebarProps) {
  const [isPending, startTransition] = useTransition();

  const handleSelect = (organizationId: string, organizationSlug: string) => {
    if (organizationId === activeId || isPending) return;

    startTransition(async () => {
      try {
        await setActiveHaven(organizationId, organizationSlug);
      } catch (error) {
        console.error("Failed to switch haven:", error);
      }
    });
  };

  return (
    <div className="h-full border-r bg-background">
      <div className="flex flex-col h-full">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">Havens</h2>
        </div>

        <div className="flex-1 overflow-y-auto">
          {havens.map((haven) => {
            const isActive = haven.id === activeId;
            return (
              <button
                key={haven.id}
                onClick={() => handleSelect(haven.id, haven.slug)}
                disabled={isPending}
                className={cn(
                  "w-full flex items-center gap-3 p-3 hover:bg-accent transition-colors",
                  isActive && "bg-accent",
                  isPending && "opacity-50 cursor-not-allowed"
                )}
              >
                <Avatar className="h-12 w-12 shrink-0">
                  <AvatarImage src={haven.logo || undefined} alt={haven.name} />
                  <AvatarFallback className="text-sm">
                    {haven.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0 text-left">
                  <p className="font-medium text-sm truncate">{haven.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    /{haven.slug}
                  </p>
                </div>

                {isActive && (
                  <Check className="h-4 w-4 text-primary shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type SectionWrapperProps = {
  children: ReactNode;
  className?: string;
  bordered?: boolean;
  background?: "default" | "muted" | "highlight";
};

export function SectionWrapper({
  children,
  className,
  bordered = false,
  background = "default",
}: SectionWrapperProps) {
  const bgClass =
    background === "muted"
      ? "bg-muted/20"
      : background === "highlight"
      ? "bg-accent/10"
      : "bg-background";

  return (
    <section
      className={cn(
        "px-4 py-16 md:py-32 w-full",
        bgClass,
        bordered && "border-y",
        className
      )}
    >
      <div className="mx-auto max-w-5xl">{children}</div>
    </section>
  );
}

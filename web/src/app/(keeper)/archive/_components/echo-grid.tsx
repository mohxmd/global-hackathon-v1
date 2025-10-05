import Link from "next/link";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { Echo } from "@/data/echoes/get-echoes";
import { EchoCard } from "./echo-card";

type EchoGridProps = {
  echoes: Echo[];
  addHref?: string;
};

export function EchoGrid({ echoes, addHref = "/echo/new" }: EchoGridProps) {
  if (!echoes.length) {
    return (
      <Empty className="bg-muted/30">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <img src="/archive-placeholder.jpg" alt="" className="h-10 w-10" />
          </EmptyMedia>
          <EmptyTitle>
            {"Your Archive is waiting for its first Echo."}
          </EmptyTitle>
          <EmptyDescription>
            {"Start capturing moments and stories."}
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button asChild>
            <Link href={addHref}>Create Echo</Link>
          </Button>
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {echoes.map((e) => (
        <EchoCard key={e.echo.id} {...e} />
      ))}
    </div>
  );
}

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Echo } from "@/data/echoes/get-echoes";
import { EchoCard } from "./echo-card";
import { EchoCreateSheet } from "./echo-create-form";
import { Button } from "@/components/ui/button";

type EchoGridProps = {
  echoes: Echo[];
};

export function EchoGrid({ echoes }: EchoGridProps) {
  if (!echoes.length) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyTitle>
            {"Your Archive is waiting for its first Echo."}
          </EmptyTitle>
          <EmptyDescription>
            {"Start capturing moments and stories."}
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <EchoCreateSheet>
            <Button>Create Echo</Button>
          </EchoCreateSheet>
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

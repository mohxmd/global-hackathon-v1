import { Button } from "@/components/ui/button";
import Link from "next/link";

export function FeatureTagline() {
  return (
    <div className="col-span-full border-y p-12 text-center">
      <h1 className="text-2xl font-bold mb-4">
        Ready to start your first Haven?
      </h1>

      <Button asChild variant="default">
        <Link href="/sign-up">Get Started</Link>
      </Button>
    </div>
  );
}

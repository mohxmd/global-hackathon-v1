import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HavenCreateForm } from "../_components/haven-create-form";

export default function page() {
  return (
    <main className="min-h-[100svh] flex items-center">
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <Card className="border-border">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl md:text-3xl text-balance">
                Create your Haven
              </CardTitle>
              <CardDescription className="text-pretty">
                Every memory needs a home. Give yours a name.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <HavenCreateForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

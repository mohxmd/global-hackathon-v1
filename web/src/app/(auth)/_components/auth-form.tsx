"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { PasswordInput } from "@/components/ui/password-input";

interface AuthFormProps {
  mode: "signin" | "signup";
}

export function AuthForm({ mode }: AuthFormProps) {
  const [loading, setLoading] = useState(false);

  const isSignup = mode === "signup";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  }

  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      <form
        onSubmit={handleSubmit}
        className="bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]"
      >
        <div className="p-8 pb-6">
          <div>
            <Link href="/" aria-label="go home">
              🌌
            </Link>

            <h1 className="mb-1 mt-4 text-xl font-semibold">
              {isSignup ? "Create an Account" : "Welcome Back"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isSignup
                ? "Sign up to start keeping your memories safe"
                : "Sign in to continue to your havens"}
            </p>
          </div>

          <div className="mt-6 space-y-5">
            {isSignup && (
              <div className="space-y-2">
                <Label htmlFor="name" className="block text-sm">
                  Name
                </Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Eren Yeager"
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="eren@example.com"
                name="email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="block text-sm">
                Password
              </Label>
              <PasswordInput
                id="password"
                name="password"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full mt-2">
              {loading ? "Please wait..." : isSignup ? "Sign Up" : "Sign In"}
            </Button>
          </div>
        </div>

        <div className="bg-muted rounded-b-[calc(var(--radius)+.125rem)] border-t p-3">
          <p className="text-accent-foreground text-center text-sm">
            {isSignup ? "Already have an account?" : "Don't have an account?"}
            <Button asChild variant="link" className="px-2">
              <Link href={isSignup ? "/sign-in" : "/sign-up"}>
                {isSignup ? "Sign In" : "Sign Up"}
              </Link>
            </Button>
          </p>
        </div>
      </form>
    </section>
  );
}

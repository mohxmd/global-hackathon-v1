"use client";

import { useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signInAction, signUpAction } from "../_actions";
import {
  signInSchema,
  signUpSchema,
  type SignIn,
  type SignUp,
} from "@/lib/zod-validations/auth";

type AuthFormProps = {
  mode: "signin" | "signup";
};

export function AuthForm({ mode }: AuthFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const isSignup = mode === "signup";

  const form = useForm<SignUp | SignIn>({
    resolver: zodResolver(isSignup ? signUpSchema : signInSchema) as any,
    defaultValues: isSignup
      ? { name: "", email: "", password: "" }
      : { email: "", password: "", rememberMe: true },
  });

  function onSubmit(values: SignUp | SignIn) {
    startTransition(async () => {
      const result = isSignup
        ? await signUpAction(values as SignUp)
        : await signInAction(values as SignIn);

      if (result.success) {
        toast.success(
          isSignup ? "Account created successfully!" : "Signed in successfully!"
        );
        router.replace("/archive");
      } else {
        toast.error(result.error);
      }
    });
  }

  return (
    <section className="flex min-h-screen px-4 py-16 md:py-32 dark:bg-transparent">
      <div className="bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]">
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

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-6 space-y-5"
            >
              {isSignup && (
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Eren Yeager" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="eren@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isPending}
                className="w-full mt-2"
              >
                {isPending
                  ? "Please wait..."
                  : isSignup
                  ? "Sign Up"
                  : "Sign In"}
              </Button>
            </form>
          </Form>
        </div>

        <div className="bg-muted rounded-b border-t p-3">
          <p className="text-accent-foreground text-center text-sm">
            {isSignup ? "Already have an account?" : "Don't have an account?"}

            <Button asChild variant="link" className="px-2">
              <Link href={isSignup ? "/join" : "/enter"}>
                {isSignup ? "Sign In" : "Sign Up"}
              </Link>
            </Button>
          </p>
        </div>
      </div>
    </section>
  );
}

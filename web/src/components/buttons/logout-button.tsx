"use client";

import { useTransition } from "react";
import { redirect } from "next/navigation";

import { type VariantProps } from "class-variance-authority";
import { toast } from "sonner";

import { Button, type buttonVariants } from "@/components/ui//button";
import { authClient } from "@/lib/auth/auth-client";

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

type LogoutButtonProps = {
  text?: string;
  loadingText?: string;
  children?: React.ReactNode;
  className?: string;
  variant?: ButtonVariantProps["variant"];
  size?: ButtonVariantProps["size"];
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function LogoutButton({
  text = "Logout",
  loadingText = "Logging out...",
  children,
  className,
  variant = "outline",
  size,
  ...props
}: LogoutButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            redirect("/sign-in");
          },
          onError: (ctx) => {
            toast.error(
              ctx.error.message || "Logout hit a snag! Please try again."
            );
          },
        },
      });
    });
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleLogout}
      disabled={isPending}
      {...props}
    >
      {children || (isPending ? loadingText : text)}
    </Button>
  );
}

export default LogoutButton;

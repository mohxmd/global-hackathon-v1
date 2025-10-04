import { ZodError } from "zod";

export function getErrorMessage(error: unknown): string {
  if (typeof error === "string") return error;
  if (error instanceof ZodError) {
    return error.issues[0]?.message ?? "Validation error";
  }
  if (error instanceof Error) return error.message;
  if (typeof error === "object" && error !== null && "message" in error) {
    return String((error as { message: unknown }).message);
  }
  return "An unexpected error occurred";
}

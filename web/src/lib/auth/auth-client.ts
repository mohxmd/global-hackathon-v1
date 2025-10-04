import { createAuthClient } from "better-auth/react";
import { adminClient, organizationClient } from "better-auth/client/plugins";
import { toast } from "sonner";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",

  plugins: [organizationClient(), adminClient()],
  fetchOptions: {
    onError: (ctx) => {
      if (ctx.error.status === 429) {
        toast.error("Too many requests. Please try again later.");
      }
      console.error("BETTER AUTH ERROR", ctx.error);
    },
  },
});

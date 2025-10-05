"use server";

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function setActiveHaven(
  organizationId: string,
  organizationSlug: string
) {
  try {
    await auth.api.setActiveOrganization({
      body: {
        organizationId,
        organizationSlug,
      },
      headers: await headers(),
    });

    revalidatePath("/archive");
  } catch (error) {
    console.error("Failed to set active organization:", error);
    throw new Error("Failed to switch haven");
  }
}

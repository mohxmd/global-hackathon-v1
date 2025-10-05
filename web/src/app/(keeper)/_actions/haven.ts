"use server";

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { getSession } from "@/data/auth/session";
import {
  OrganizationInsert,
  organizationInsertSchema,
} from "@/db/schema/auth.sql";
import { toSlug } from "@/lib/utils/string";
import { getErrorMessage } from "@/lib/utils/error";

export async function createHaven(data: OrganizationInsert) {
  try {
    const session = await getSession();
    const validated = organizationInsertSchema.parse(data);

    const userId = session.user.id;
    const slug = toSlug(validated.slug || validated.name);

    const newHaven = await auth.api.createOrganization({
      body: {
        name: validated.name,
        logo: String(validated.logo),
        keepCurrentActiveOrganization: true,
        slug,
        userId,
      },
      headers: await headers(),
    });

    if (!newHaven) {
      return { success: false, error: "Haven creation failed" };
    }

    revalidatePath("/archive");

    return { success: true, slug: newHaven?.slug };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}

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

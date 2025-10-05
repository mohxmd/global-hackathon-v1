"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
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

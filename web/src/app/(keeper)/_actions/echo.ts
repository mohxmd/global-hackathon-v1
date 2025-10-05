"use server";

import { db } from "@/db";
import { echo } from "@/db/schema/echo.sql";
import { getSession } from "@/data/auth/session";
import { revalidatePath } from "next/cache";
import type { EchoInsert } from "@/db/schema/echo.sql";

export async function createEcho(values: EchoInsert) {
  try {
    const { user, session } = await getSession();

    await db.insert(echo).values({
      organizationId: session.activeOrganizationId!,
      createdBy: user.id,
      title: values.title,
      content: values.content || null,
      image: String(values.image) || null,
      hashtags: values.hashtags || [],
    });

    revalidatePath("/archive");
    return { success: true };
  } catch (error) {
    console.error("Error creating echo:", error);
    return { success: false, error: "Failed to create echo" };
  }
}

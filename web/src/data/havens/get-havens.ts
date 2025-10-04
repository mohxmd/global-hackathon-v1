import { db } from "@/db";
import { member } from "@/db/schema/auth.sql";
import { eq } from "drizzle-orm";

export async function getUserHavens(userId: string) {
  const havens = await db
    .select()
    .from(member)
    .where(eq(member.userId, userId));
  return havens.length > 0;
}

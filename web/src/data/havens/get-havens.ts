import { db } from "@/db";
import { member, organization } from "@/db/schema/auth.sql";
import { eq } from "drizzle-orm";
import { getSession } from "../auth/session";

export async function getUserHavens() {
  const { user } = await getSession();
  const havens = await db
    .select({
      id: organization.id,
      name: organization.name,
      slug: organization.slug,
      logo: organization.logo,
      createdAt: organization.createdAt,
      role: member.role,
    })
    .from(member)
    .innerJoin(organization, eq(member.organizationId, organization.id))
    .where(eq(member.userId, user.id))
    .orderBy(organization.createdAt);

  return havens;
}

export async function getHaven() {
  const { session } = await getSession();
  const [haven] = await db
    .select()
    .from(organization)
    .where(eq(organization.id, session.activeOrganizationId!));
  return haven;
}

export type UserHaven = Awaited<ReturnType<typeof getUserHavens>>[0];

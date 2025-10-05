import { db } from "@/db";
import { getSession } from "../auth/session";
import { eq } from "drizzle-orm";
import { echo, user } from "@/db/schema";

export async function getEchoes() {
  const { session } = await getSession();
  const echoes = await db
    .select({
      echo: echo,
      author: user,
    })
    .from(echo)
    .leftJoin(user, eq(echo.createdBy, user.id))
    .where(eq(echo.organizationId, session.activeOrganizationId!));

  return echoes;
}

export type Echo = Awaited<ReturnType<typeof getEchoes>>[0];

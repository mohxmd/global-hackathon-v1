import { ne } from "drizzle-orm";
import { db } from "@/db";
import { getSession } from "../auth/session";
import { user } from "@/db/schema";

export async function getUsers() {
  const { session } = await getSession();
  const users = await db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
    })
    .from(user)
    .where(ne(user.id, session.userId));

  return users;
}

export type User = Awaited<ReturnType<typeof getUsers>>[0];

import { db } from "$lib/server/db.server";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  const user = await db.user.findUnique({
    where: {
      id: locals.user?.id!,
    },
    select: {
      bio: true,
      nickname: true,
      username: true,
      email: true,
    },
  });
  if (!user) throw error(500, "internal error");
  return user;
};

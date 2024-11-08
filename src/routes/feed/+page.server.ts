import { db } from "$lib/server/db.server";
import type { Cookies } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { auth } from "$lib/jwt.server";

export const load: PageServerLoad = async ({
  cookies,
}: {
  cookies: Cookies;
}) => {
  const session = cookies.get("token") ?? "";
  const data = await auth.decryptToken(session);

  const user = await db.user.findUnique({
    where: {
      id: data.payload.id,
    },
  });

  const posts = await db.post.findMany({
    take: 25,
    where: {
      author: {
        in: user?.following || [],
      },
    },
    orderBy: {
      posted: "desc",
    },
  });

  return {
    posts,
  };
};

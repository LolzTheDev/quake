import { db } from "$lib/server/db.server";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const posts = await db.post.findMany({
    take: 25,
    orderBy: {
      posted: "desc",
    },
  });

  return {
    posts,
  };
};

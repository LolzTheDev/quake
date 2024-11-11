import { db } from "$lib/server/db.server";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const users = db.user.findMany({
    take: 10,
    orderBy: {
      followers: "desc",
    },
  });

  const posts = db.post.findMany({
    take: 20,
    orderBy: {
      posted: "desc",
    },
  });

  return {
    users,
    posts,
  };
};

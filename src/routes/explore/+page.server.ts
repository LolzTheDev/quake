import { db } from "$lib/server/db.server";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  let users = db.user.findMany({
    take: 9,
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

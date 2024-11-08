import { db } from "$lib/server/db.server";
import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }: { params: any }) => {
  const user = await db.user.findUnique({
    where: {
      username: params.name,
    },
    select: {
      username: true,
      nickname: true,
      bio: true,
      admin: true,
      banned: true,
      mod: true,
      verified: true,
      id: true,
      followers: true,
      following: true,
    },
  });

  const posts = await db.post.findMany({
    where: {
      author: user?.id,
    },
    orderBy: {
      posted: "desc",
    },
    take: 30,
  });

  return {
    user,
    posts,
  };
};

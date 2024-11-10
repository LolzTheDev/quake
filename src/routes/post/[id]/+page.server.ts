import { db } from "$lib/server/db.server";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }: { params: any }) => {
  const post = await db.post.findUnique({
    where: {
      id: params.id,
    },
  });

  return {
    post,
  };
};

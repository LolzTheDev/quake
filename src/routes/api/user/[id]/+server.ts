import { db } from "$lib/server/db.server";
import { json } from "@sveltejs/kit";

export async function GET({
  request,
  params,
}: {
  request: Request;
  params: any;
}) {
  const user = await db.user.findUnique({
    where: { id: params.id },
    select: {
      username: true,
      nickname: true,
      admin: true,
      banned: true,
      mod: true,
      verified: true,
    },
  });

  return json(user);
}

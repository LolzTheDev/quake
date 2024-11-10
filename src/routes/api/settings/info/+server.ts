import { auth } from "$lib/jwt.server";
import { db } from "$lib/server/db.server";
import { json } from "@sveltejs/kit";
import type { RequestEvent } from "./$types";

export async function POST({
  request,
  fetch,
}: {
  request: Request;
  fetch: (url: string, options: Object) => Promise<any>;
}) {
  const token = request.headers.get("Authorization") ?? "";

  if (!(await auth.verifyToken(token))) {
    return json({
      error: true,
      message: "unauthorized",
    });
  }

  const session = await auth.decryptToken(token);
  const { nickname, bio } = await request.json();

  if (!nickname || !bio)
    return json({ error: true, message: "missing details " });

  if (nickname.length > 15 || bio.length > 50)
    return json({ error: true, message: "detail length too long" });

  await db.user.update({
    where: {
      id: session.payload.id,
    },
    data: {
      bio,
      nickname,
    },
  });

  await fetch("/api/login/refresh", {
    headers: {
      Authorization: token,
    },
    method: "POST",
  });

  return json({
    error: false,
    message: "updated profile",
  });
}

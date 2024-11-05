import { auth } from "$lib/jwt.server";
import { db } from "$lib/server/db.server";
import { json } from "@sveltejs/kit";

export async function POST({ request }: { request: Request }) {
  const session = await auth.verifyToken(
    request.headers.get("Authorization") ?? "",
  );
  const { content } = await request.json();

  if (!session) {
    return json({
      ok: false,
      message: "unauthorized",
    });
  }

  const user = await auth.decryptToken(
    request.headers.get("Authorization") ?? "",
  );

  const post = await db.post.create({
    data: {
      author: user.payload.id,
      content,
    },
  });

  if (!post) {
    return json({
      ok: false,
      message: "unknown error",
    });
  }

  return json({
    ok: true,
    message: "posted",
  });
}

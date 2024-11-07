import { auth } from "$lib/jwt.server";
import { db } from "$lib/server/db.server";
import { json } from "@sveltejs/kit";

export async function POST({
  request,
  params,
}: {
  request: Request;
  params: any;
}) {
  const token = request.headers.get("Authorization") ?? "";
  if (!(await auth.verifyToken(token))) {
    return json({
      status: false,
      message: "logged out / invalid session",
    });
  }

  const session = await auth.decryptToken(token);
  const post = await db.post.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!post) {
    return json({
      status: false,
      message: "post not found",
    });
  }

  if (!post.likes.includes(session.payload.id)) {
    let likes = post.likes;
    likes.push(session.payload.id);
    await db.post.update({
      where: {
        id: params.id,
      },
      data: {
        likes: likes,
      },
    });
  } else if (post.likes.includes(session.payload.id)) {
    await db.post.update({
      where: {
        id: params.id,
      },
      data: {
        likes: post.likes.filter((like) => like !== session.payload.id),
      },
    });
  }

  return json({
    status: true,
    message: "post liked / unliked",
  });
}

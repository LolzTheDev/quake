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
  const user = await db.user.findUnique({
    where: {
      id: params.id,
    },
  });

  if (params.id === session.id) {
    return json({
      status: false,
      message: "you cannot follow yourself",
    });
  }

  if (!user) {
    return json({
      status: false,
      message: "user not found",
    });
  }

  const liUser = await db.user.findUnique({
    where: {
      id: session.payload.id,
    },
  });

  if (!user.followers.includes(session.payload.id)) {
    let followers = user.followers;
    followers.push(session.payload.id);
    await db.user.update({
      where: {
        id: params.id,
      },
      data: {
        followers,
      },
    });
    liUser?.following.push(params.id);
    await db.user.update({
      where: {
        id: session.payload.id,
      },
      data: {
        following: liUser?.following,
      },
    });
  } else if (user.followers.includes(session.payload.id)) {
    await db.user.update({
      where: {
        id: params.id,
      },
      data: {
        followers: user.followers.filter((f) => f !== session.payload.id),
      },
    });
    await db.user.update({
      where: {
        id: session.payload.id,
      },
      data: {
        following: liUser?.following.filter((f) => f !== params.id),
      },
    });
  }

  return json({
    status: true,
    message: "user followed / unfollowed",
  });
}
import { json, type Cookies } from "@sveltejs/kit";
import { db } from "$lib/server/db.server";
import { verify } from "argon2";
import { auth } from "$lib/jwt.server";

export async function POST({
  request,
  cookies,
}: {
  request: Request;
  cookies: Cookies;
}) {
  const token = request.headers.get("Authorization") ?? "";

  if (!(await auth.verifyToken(token))) {
    return json({
      error: true,
      message: "unauthorized",
    });
  }

  const session = await auth.decryptToken(token);
  const user = await db.user.findUnique({
    where: {
      id: session.payload.id,
    },
  });

  const newSession = await auth.createToken({
    user: user?.username,
    nickname: user?.nickname,
    id: user?.id,
  });

  cookies.set("token", newSession, {
    path: "/",
  });
}

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
  const { username, password } = await request.json();
  const user = await db.user.findFirst({
    where: {
      username: {
        equals: username,
        mode: "insensitive",
      },
    },
  });

  let token;

  if (!user) {
    return json({
      valid: false,
      token: "",
      message: "user does not exist",
    });
  }

  if (await verify(user.password, password)) {
    token = await auth.createToken({
      user: user.username,
      nickname: user.nickname,
      id: user.id,
    });
  } else {
    return json({
      valid: false,
      token: "",
      message: "incorrect password",
    });
  }

  cookies.set("token", token, {
    path: "/",
  });

  return json({
    valid: true,
    token,
  });
}

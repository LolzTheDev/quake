import { hash } from "$lib/encryption.server";
import { db } from "$lib/server/db.server";
import type { User } from "@prisma/client";
import { json } from "@sveltejs/kit";

export async function POST({ request }: { request: Request }) {
  const { username, email, password } = await request.json();
  const user = await db.user.findUnique({
    where: {
      username,
    },
  });

  if (user) {
    return json({
      valid: false,
      message: "account already exists",
    });
  }

  let newUser: User;
  try {
    newUser = await db.user.create({
      data: {
        email,
        username,
        nickname: username,
        password: await hash(password),
      },
    });
  } catch (err) {
    return json({
      valid: false,
      message: "email in use",
    });
  }

  if (!newUser) {
    return json({
      valid: false,
      message: "unknown error",
    });
  }

  return json({
    valid: true,
    message: "account created, log in",
  });
}

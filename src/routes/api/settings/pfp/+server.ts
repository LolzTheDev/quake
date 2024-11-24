import { auth } from "$lib/jwt.server";
import { json } from "@sveltejs/kit";
import { put } from "@vercel/blob";
import { writeFileSync } from "fs";

import { HOSTING } from "$env/static/private";

export async function POST({ request }: { request: Request }) {
  const formData = await request.formData();
  const pfp = formData.get("pfp") as File;
  const token = request.headers.get("Authorization") ?? "";

  if (!(await auth.verifyToken(token))) {
    return json({
      error: true,
      message: "unauthorized",
    });
  }

  const user = await auth.decryptToken(token);

  if (!pfp) {
    return json({ error: true, message: "provide a valid file" });
  }

  if (HOSTING === "vercel") {
    await put(`/pfp/${user.payload.id}.png`, await pfp.arrayBuffer(), {
      access: "public",
      addRandomSuffix: false,
    });
  } else {
    writeFileSync(
      `${process.cwd()}/static/content/profile/picture/${user.payload.id}.png`,
      Buffer.from(await pfp.arrayBuffer()),
    );
  }

  return json({
    error: false,
    message: "uploaded",
  });
}

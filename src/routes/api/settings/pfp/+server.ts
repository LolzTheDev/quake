import { auth } from "$lib/jwt.server";
import { json } from "@sveltejs/kit";
import { writeFileSync } from "fs";

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

  writeFileSync(
    `${__dirname}/static/content/profile/picture/${user.payload.id}.png`,
    Buffer.from(await pfp.arrayBuffer()),
  );

  return json({
    error: false,
    message: "uploaded",
  });
}

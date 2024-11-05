import type { Cookies } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { auth } from "$lib/jwt.server";

export const load: LayoutServerLoad = async ({
  cookies,
}: {
  cookies: Cookies;
}) => {
  const token = cookies.get("token") ?? "";
  let data = { payload: {} };
  if (await auth.verifyToken(token)) {
    data = await auth.decryptToken(token);
  }

  return {
    session: token,
    user: data.payload,
  };
};

import { auth } from "$lib/jwt.server";
import { redirect, type Handle } from "@sveltejs/kit";

const PROTECTED = ["/feed", "/post", "/settings"];
const LI_PROTECTED = ["/login", "/register"];

export const handle: Handle = async ({ event, resolve }) => {
  const authenticated = await auth.verifyToken(
    event.cookies.get("token") ?? "",
  );

  if (!authenticated) {
    event.locals.user = {};
    event.cookies.delete("token", {
      path: "/",
    });
  } else {
    event.locals.user = await auth.decryptToken(
      event.cookies.get("token") ?? "",
    );
  }

  if (!authenticated && PROTECTED.includes(event.url.pathname)) {
    throw redirect(303, "/login");
  }

  return resolve(event);
};

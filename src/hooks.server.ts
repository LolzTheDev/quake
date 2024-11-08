import { auth } from "$lib/jwt.server";
import { redirect, type Handle } from "@sveltejs/kit";

const PROTECTED = ["/feed", "/post", "/settings"];
const LI_PROTECTED = ["/login", "/register"];
const MW_DISABLED = ["/api/logout"];

export const handle: Handle = async ({ event, resolve }) => {
  if (MW_DISABLED.includes(event.url.pathname)) return resolve(event);

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

  if (authenticated && LI_PROTECTED.includes(event.url.pathname)) {
    throw redirect(303, "/feed");
  }

  return resolve(event);
};

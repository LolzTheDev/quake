import { auth } from "$lib/jwt.server";
import { redirect, type Handle, type RequestEvent } from "@sveltejs/kit";
import type { ResolveHookContext } from "module";

const PROTECTED = ["/feed", "/post", "/settings"];
const LI_PROTECTED = ["/login", "/register"];
const MW_DISABLED = ["/api/logout"];
const LOGS_BLACKLIST = ["/api/pfp", "/api/user"];

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

  !LOGS_BLACKLIST.some((path) => event.url.pathname.startsWith(path))
    ? console.log(
        `[${event.request.method}] ${event.url.pathname} - ${event.getClientAddress()} - @${event.locals.user.payload?.user ?? "[logged out]"}`,
      )
    : "";
  if (MW_DISABLED.includes(event.url.pathname)) return resolve(event);

  if (!authenticated && PROTECTED.includes(event.url.pathname)) {
    throw redirect(303, "/login");
  }

  if (authenticated && LI_PROTECTED.includes(event.url.pathname)) {
    throw redirect(303, "/feed");
  }

  return resolve(event);
};

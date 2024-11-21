import { auth } from "$lib/jwt.server";
import { redirect, type Handle, type RequestEvent } from "@sveltejs/kit";
import type { ResolveHookContext } from "module";

const PROTECTED = ["/feed", "/post", "/settings"];
const LI_PROTECTED = ["/login", "/register"];
const MW_DISABLED = ["/api/logout"];
const LOGS_BLACKLIST = ["/api/pfp", "/api/user"];

export const handle: Handle = async ({ event, resolve }) => {
  const user = await auth.user(event.cookies.get("token") ?? "");

  if (!user.valid) {
    event.locals.user = {};
    event.cookies.delete("token", {
      path: "/",
    });
  } else {
    event.locals.user = user.user;
  }

  !LOGS_BLACKLIST.some((path) => event.url.pathname.startsWith(path))
    ? console.log(
        `[${event.request.method}] ${event.url.pathname} - ${event.getClientAddress()} - @${user.user.name ?? "[logged out]"}`,
      )
    : "";
  if (MW_DISABLED.includes(event.url.pathname)) return resolve(event);

  if (!user.valid && PROTECTED.includes(event.url.pathname)) {
    throw redirect(303, "/login");
  }

  if (user.valid && LI_PROTECTED.includes(event.url.pathname)) {
    throw redirect(303, "/feed");
  }

  return resolve(event);
};

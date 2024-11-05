import { redirect, type Cookies } from "@sveltejs/kit";

export async function GET({
  request,
  cookies,
}: {
  request: Request;
  cookies: Cookies;
}) {
  cookies.delete("token", {
    path: "/",
  });

  return redirect(300, "/");
}

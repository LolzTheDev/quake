import { redirect, type Cookies } from "@sveltejs/kit";

export async function GET({ cookies }: { cookies: Cookies }) {
  cookies.delete("token", {
    path: "/",
  });

  throw redirect(303, "/");
}

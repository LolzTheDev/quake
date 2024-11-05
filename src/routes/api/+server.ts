import { json } from "@sveltejs/kit";

export async function GET() {
  return json({
    version: "1.0",
    documentation: "nowhere lol",
  });
}

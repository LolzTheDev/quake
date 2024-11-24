import { readFile } from "fs/promises";
import { HOSTING, BLOB_URL } from "$env/static/private";

async function returnPlaceholder() {
  const res = await fetch(
    "https://raw.githubusercontent.com/LolzTheDev/quark/main/static/content/profile/picture/invisiturtle.png",
  );

  return new Response(await res.arrayBuffer(), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=30",
    },
  });
}

export async function GET({ params }: { params: any }) {
  const id = params.id;

  if (HOSTING === "vercel") {
    const res = await fetch(`${BLOB_URL}/pfp/${id}.png`);
    if (!res.ok) {
      return returnPlaceholder();
    }

    return new Response(await res.arrayBuffer(), {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=180",
      },
    });
  } else {
    try {
      return new Response(
        await readFile(
          `${process.cwd()}/static/content/profile/picture/${id}.png`,
        ),
        {
          headers: {
            "Cache-Control": "public, max-age=15",
          },
        },
      );
    } catch (err) {
      return returnPlaceholder();
    }
  }
}

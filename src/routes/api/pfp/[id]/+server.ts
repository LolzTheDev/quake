import { readFile } from "fs/promises";

export async function GET({ params }: { params: any }) {
  const id = params.id;

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
    const response = await fetch(
      "https://raw.githubusercontent.com/LolzTheDev/quark/main/static/content/profile/picture/invisiturtle.png",
    );

    return new Response(await response.arrayBuffer(), {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000",
      },
    });
  }
}

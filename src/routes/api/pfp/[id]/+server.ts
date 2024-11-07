import { readFile } from "fs/promises";

export async function GET({ params }: { params: any }) {
  const id = params.id;

  try {
    return new Response(
      await readFile(
        `${process.cwd()}/static/content/profile/picture/${id}.png`,
      ),
    );
  } catch (err) {
    return new Response(
      await readFile(
        `${process.cwd()}/static/content/profile/picture/invisiturtle.png`,
      ),
    );
  }
}

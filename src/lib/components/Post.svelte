<script lang="ts">
  import { onMount } from "svelte";
  import type { Post } from "@prisma/client";

  const { post } = $props<{ post: Post }>();

  let username = $state("");

  async function fetchUsername() {
    const response = await fetch(`/api/user/${post.author}`);
    const user = await response.json();
    username = user.username;
  }

  onMount(() => {
    fetchUsername();
  });
</script>

<div
  class="p-4 border rounded-xl bg-zinc-50 border-zinc-300 hover:scale-[102.5%] duration-300"
>
  <div class="flex gap-2 items-center">
    <object
      data={`/content/profile/picture/${post.author}.png`}
      type="image/png"
      class="size-8 rounded-md"
    >
      <img
        src="/content/profile/picture/invisiturtle.png"
        class="size-8 rounded-md"
      />
    </object>
    <p class="font-semibold">@{username || "fetching..."}</p>
  </div>
  <hr class="my-2 border-zinc-300" />

  <p>{post.content}</p>
</div>

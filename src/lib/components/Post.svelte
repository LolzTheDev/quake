<script lang="ts">
  import { onMount } from "svelte";
  import type { Post } from "@prisma/client";
  import { Heart, ShieldCheck, Verified } from "lucide-svelte";
  import { page } from "$app/stores";

  const { post }: { post: Post } = $props<{ post: Post }>();
  let liked = $state<boolean>(post.likes.includes($page.data.user.id));
  let likes = $state(post.likes.length);
  let user = $state({
    username: "fetching...",
    nickname: "fetching...",
    admin: false,
    banned: false,
    mod: false,
    verified: false,
    id: "fetching...",
  });
  let img = $state<string | undefined>(
    `/content/profile/picture/${post.author}.png`,
  );
  const posted = new Date(post.posted);

  async function fetchUsername() {
    const response = await fetch(`/api/user/${post.author}`);
    user = await response.json();
  }

  async function like() {
    const res = await fetch(`/api/like-post/${post.id}`, {
      headers: {
        Authorization: $page.data.session,
      },
      method: "POST",
    });

    const json = await res.json();

    if (!json.status) {
      alert(json.message);
      return;
    }

    liked = !liked;
    liked ? likes++ : likes--;
  }

  onMount(() => {
    fetchUsername();
  });
</script>

<div
  class="p-4 border rounded-xl bg-zinc-50 border-zinc-300 hover:scale-[102.5%] duration-300"
>
  <div class="flex gap-2 items-center">
    <img src={`/api/pfp/${user.id}`} class="size-8 rounded-md" alt="pfp" />

    <div class="flex items-center">
      <p class="font-semibold text-lg mr-1" title={`@${user.username}`}>
        {user.nickname}
      </p>

      {#if user.verified}
        <Verified class="text-zinc-50 size-[24px]" fill="#0ea5e9" />
      {/if}

      {#if user.admin}
        <ShieldCheck class="text-zinc-50 size-[24px]" fill="#0ea5e9" />
      {/if}
    </div>
  </div>
  <hr class="my-3 border-zinc-300" />

  <p>{post.content}</p>

  <div class="mt-3">
    <div class="flex items-center justify-between">
      <button onclick={like} class="flex items-center gap-1 like">
        <Heart
          class="size-4 text-red-500"
          fill={liked ? "#ef4444" : "transparent"}
        />
        <p>{likes}</p>
      </button>

      <p class="text-sm opacity-40">
        {`${posted.getMonth() + 1} / ${posted.getDate()} / ${posted.getFullYear()} @ ${posted.getHours() + 1}:${posted.getMinutes() < 9 ? 0 : ""}${posted.getMinutes()}`}
      </p>
    </div>
  </div>
</div>

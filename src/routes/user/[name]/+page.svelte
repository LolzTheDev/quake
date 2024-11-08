<script lang="ts">
  import type { PageServerData } from "./$types";
  import Post from "$lib/components/Post.svelte";

  const { data }: { data: PageServerData } = $props();
</script>

<main>
  {#if data.user}
    <div class="flex items-center gap-4 mx-12">
      <img
        src={`/api/pfp/${data.user.id}`}
        class="rounded-md size-20 border border-zinc-400 bg-white"
        alt="user pfp"
      />

      <div class="grid items-center">
        <p class="text-4xl font-bold">{data.user.nickname}</p>
        <p class="text-lg">@{data.user.username}</p>
      </div>
    </div>

    {#if data.posts.length === 0}
      <p class="text-center">looking empty...</p>
    {:else}
      <div class="flex w-full justify-center">
        <div class="w-2/5 space-y-3">
          {#each data.posts as post}
            <Post {post} />
          {/each}
        </div>
      </div>
    {/if}
  {:else}
    <h2 class="text-3xl font-bold">404</h2>
    <p>user does not exist</p>
  {/if}
</main>

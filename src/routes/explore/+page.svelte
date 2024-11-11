<script lang="ts">
  import type { PageServerData } from "./$types";
  import Post from "$lib/components/Post.svelte";

  const { data }: { data: PageServerData } = $props();
</script>

<main>
  <h3 class="text-4xl font-bold text-center">explore</h3>

  <div class="my-4">
    <p class="text-2xl font-semibold text-center my-4">recent posts</p>

    {#await data?.posts}
      <p class="text-center">loading posts</p>
    {:then posts}
      {#if posts.length === 0}
        <p class="text-center">looking empty...</p>
      {:else}
        <div class="flex w-full justify-center">
          <div class="lg:w-2/5 space-y-3">
            {#each posts as post}
              <Post {post} />
            {/each}
          </div>
        </div>
      {/if}
    {/await}
  </div>
</main>

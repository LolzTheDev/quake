<script lang="ts">
  import Post from "$lib/components/Post.svelte";
  import type { PageServerData } from "./$types";

  const { data }: { data: PageServerData } = $props();
</script>

<svelte:head>
  <title>quark - post</title>
</svelte:head>

<main>
  {#if !data.post}
    <p>post not found!</p>
  {:else}
    <div class="flex w-full justify-center">
      <div class="lg:w-2/5 w-full space-y-3">
        <Post post={data.post} />
      </div>
    </div>
  {/if}
</main>

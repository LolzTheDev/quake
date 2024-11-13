<script lang="ts">
  import type { PageServerData } from "./$types";
  import Post from "$lib/components/Post.svelte";
  import User from "$lib/components/User.svelte";

  const { data }: { data: PageServerData } = $props();
</script>

<svelte:head>
  <title>quark - explore</title>

  <meta name="og:title" content="explore" />

  <meta
    name="og:description"
    content="find the latest and freshest posts on quark social"
  />

  <meta name="theme-color" content="#0ea5e9" />
</svelte:head>

<main>
  <h3 class="text-4xl font-bold text-center">explore</h3>

  <!--
  <div class="my-4">
    <p class="text-2xl font-semibold text-center my-4">popular users</p>

    {#await data?.users}
      <p class="text-center">loading users</p>
    {:then users}
      {#if users.length === 0}
        <p class="text-center">looking empty...</p>
      {:else}
        <div class="flex w-full justify-center">
          <div class="lg:w-4/5 grid grid-cols-3 gap-4">
            {#each users as user}
              <User id={user.id} />
            {/each}
          </div>
        </div>
      {/if}
    {/await}
  </div> -->

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

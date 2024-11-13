<script lang="ts">
  import type { PageServerData } from "./$types";
  import { page } from "$app/stores";
  import User from "$lib/components/User.svelte";

  const { data }: { data: PageServerData } = $props();
  let followerCount = $state(data.profile?.followers.length || 0);

  $effect(() => {
    followerCount = data.profile?.followers.length || 0;
  });
</script>

<svelte:head>
  <title>quark - @{data.profile?.username}'s followers</title>

  <meta
    name="og:title"
    content={`${data.profile?.nickname} (@${data.profile?.username})`}
  />

  <meta
    name="og:description"
    content={`view ${data.profile?.nickname}'s followers on quark!`}
  />

  <meta name="theme-color" content="#0ea5e9" />
</svelte:head>

<main>
  {#if data.profile}
    <h1 class="text-3xl font-bold">
      {data.profile.nickname}'s followers ({followerCount})
    </h1>
    <hr class="my-4 border-zinc-400" />
    <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
      {#each data.profile.followers as follower}
        <User id={follower} />
      {/each}
    </div>
  {:else}
    <h2 class="text-3xl font-bold">404</h2>
    <p>user does not exist</p>
  {/if}
</main>

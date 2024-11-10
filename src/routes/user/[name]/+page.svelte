<script lang="ts">
  import type { PageServerData } from "./$types";
  import Post from "$lib/components/Post.svelte";
  import { page } from "$app/stores";
  import { UserRoundPlus } from "lucide-svelte";

  const { data }: { data: PageServerData } = $props();
  let following = $state(data.profile?.followers.includes($page.data.user.id));
  let followers = $state(data.profile?.followers.length || 0);

  async function toggleFollow() {
    const res = await fetch(`/api/follow-user/${data.profile?.id}`, {
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

    following = !following;
    following ? followers++ : followers--;
  }
</script>

<svelte:head>
  <meta
    name="og:title"
    content={`${data.profile?.nickname} (@${data.profile?.username})`}
  />

  <meta
    name="og:description"
    content={`view ${data.profile?.nickname}'s profile on quark!`}
  />

  <meta name="theme-color" content="#FF0000" />
</svelte:head>

<main>
  {#if data.profile}
    <div
      class="flex items-center gap-2 bg-sky-200 py-8 px-8 mb-4 rounded-lg border border-sky-400 w-1/2 mx-auto justify-between"
    >
      <div class="flex items-center gap-4">
        <img
          src={`/api/pfp/${data.profile.id}`}
          class="rounded-md size-24 border border-zinc-400 bg-white"
          alt="user pfp"
        />

        <div class="grid items-center">
          <p class="text-4xl font-bold">{data.profile.nickname}</p>
          <p class="text-lg">@{data.profile.username}</p>
          <p>{data.profile.bio}</p>
        </div>
      </div>

      <div class="gap-2 flex items-center">
        <p>{followers} followers</p>
        <button
          class={following
            ? "!bg-zinc-400 w-28 flex items-center gap-2 justify-center"
            : "w-28 flex items-center gap-2 justify-center"}
          onclick={toggleFollow}
        >
          <UserRoundPlus size={24} />
          <p>{following ? "unfollow" : "follow"}</p>
        </button>
      </div>
    </div>

    <p class="my-2 text-xl font-semibold text-center">
      posts by {data.profile.nickname}
    </p>

    {#await data.posts}
      <p class="text-center">loading posts...</p>
    {:then posts}
      {#if posts.length === 0}
        <p class="text-center">looking empty...</p>
      {:else}
        <div class="flex w-full justify-center">
          <div class="w-2/5 space-y-3">
            {#each posts as post}
              <Post {post} />
            {/each}
          </div>
        </div>
      {/if}
    {/await}
  {:else}
    <h2 class="text-3xl font-bold">404</h2>
    <p>user does not exist</p>
  {/if}
</main>

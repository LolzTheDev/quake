<script lang="ts">
  import type { PageServerData } from "./$types";
  import Post from "$lib/components/Post.svelte";
  import { page } from "$app/stores";
  import { ShieldCheck, UserRoundPlus, Verified } from "lucide-svelte";

  const { data }: { data: PageServerData } = $props();
  let following = $state(data.profile?.followers.includes($page.data.user.id));
  let followingCount = $state(data.profile?.following.length);
  let followers = $state(data.profile?.followers.length || 0);
  let authorized = $state($page.data.session ? true : false);

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

  $effect(() => {
    following = data.profile?.followers.includes($page.data.user.id);
    followers = data.profile?.followers.length || 0;
    authorized = $page.data.session ? true : false;
    followingCount = data.profile?.following.length;
  });
</script>

<svelte:head>
  <title>quark - @{data.profile?.username}'s profile</title>

  <meta
    name="og:title"
    content={`${data.profile?.nickname} (@${data.profile?.username})`}
  />

  <meta
    name="og:description"
    content={`view ${data.profile?.nickname}'s profile on quark!`}
  />

  <meta name="theme-color" content="#0ea5e9" />
</svelte:head>

<main>
  {#if data.profile}
    <div
      class="flex items-center gap-2 bg-sky-100 py-8 px-8 mb-4 rounded-lg border border-sky-400 lg:w-3/5 mx-auto justify-between"
    >
      <div class="flex items-center gap-4">
        <img
          src={`/api/pfp/${data.profile.id}`}
          class="rounded-md size-24"
          alt="user pfp"
        />

        <div class="grid items-center">
          <div class="flex gap-2 items-center">
            <p class="lg:text-4xl max-w-96 line-clamp-1 font-bold text-lg">
              {data.profile.nickname}
            </p>
            {#if data.profile.verified}
              <Verified class="text-sky-100 size-[32px]" fill="#0ea5e9" />
            {/if}

            {#if data.profile.admin}
              <ShieldCheck class="text-sky-100 size-[32px]" fill="#0ea5e9" />
            {/if}
          </div>
          <p class="lg:text-lg text-xs">@{data.profile.username}</p>
          <p class="lg:text-base text-xs max-w-80">{data.profile.bio}</p>
        </div>
      </div>

      <div class="gap-2 flex items-center">
        <a
          href={`/user/${data.profile.username}/followers`}
          class="lg:text-base lg:opacity-100 opacity-0 hover:underline"
        >
          {followers} followers
        </a>

        <p class="opacity-0 lg:opacity-100">&bull;</p>

        <p class="lg:text-base lg:opacity-100 opacity-0">
          {followingCount} following
        </p>

        {#if authorized}
          <button
            class={following
              ? "!bg-zinc-400 w-28 flex items-center gap-2 justify-center"
              : "w-28 flex items-center gap-2 justify-center"}
            onclick={toggleFollow}
          >
            <UserRoundPlus size={24} />
            <p>{following ? "unfollow" : "follow"}</p>
          </button>
        {/if}
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
          <div class="lg:w-2/5 w-full space-y-3">
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

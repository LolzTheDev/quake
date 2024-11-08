<script lang="ts">
  import type { PageServerData } from "./$types";
  import Post from "$lib/components/Post.svelte";
  import { page } from "$app/stores";

  const { data }: { data: PageServerData } = $props();
  let following = $state(false);
  let followers = $state(data.user?.followers.length || 0);

  if (data.user) following = data.user.followers.includes($page.data.user.id);

  async function toggleFollow() {
    const res = await fetch(`/api/follow-user/${data.user?.id}`, {
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

    console.log(json);
    following = !following;
    following ? followers++ : followers--;
  }
</script>

<main>
  {#if data.user}
    <div
      class="flex items-center gap-2 bg-sky-200 py-8 px-8 mb-4 rounded-lg border border-sky-400 w-1/2 mx-auto justify-between"
    >
      <div class="flex items-center gap-4">
        <img
          src={`/api/pfp/${data.user.id}`}
          class="rounded-md size-24 border border-zinc-400 bg-white"
          alt="user pfp"
        />

        <div class="grid items-center">
          <p class="text-4xl font-bold">{data.user.nickname}</p>
          <p class="text-lg">@{data.user.username}</p>
          <p>{data.user.bio}</p>
        </div>
      </div>

      <div class="gap-2 flex items-center">
        <p>{followers} followers</p>
        <button class={following ? "!bg-zinc-400" : ""} onclick={toggleFollow}
          >{following ? "unfollow" : "follow"}</button
        >
      </div>
    </div>

    <p class="my-2 text-xl font-semibold text-center">
      posts by {data.user.nickname}
    </p>

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

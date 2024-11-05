<script lang="ts">
  import Post from "$lib/components/Post.svelte";
  import type { PageServerData } from "./$types";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  export let data: PageServerData;
  let content = "";
  let status = "ok";
  let message = "";

  async function post() {
    if (!content) {
      status = "not ok";
      message = "post cannot be empty";
      return;
    }

    const res = await fetch("/api/post", {
      method: "POST",
      headers: {
        Authorization: $page.data.session,
      },
      body: JSON.stringify({ content }),
    });

    const json = await res.json();

    if (!json.ok) {
      status = "not ok";
      message = json.message;
    }

    // set href to prevent state preserving
    window.location.href = "/feed";
  }
</script>

<main>
  <h1 class="text-center text-4xl font-bold">your feed</h1>

  {#if status === "not ok"}
    <div
      class="mt-4 bg-red-100 rounded-md border-red-400 border-2 mx-auto w-96 p-2"
    >
      <h1 class="text-lg font-bold">error</h1>
      <h1 class="font-medium">
        {message}
      </h1>
    </div>
  {/if}

  <div class="flex w-full justify-center">
    <form onsubmit={post} class="my-4">
      <input type="text" placeholder="post anything..." bind:value={content} />
      <input type="submit" value="create" />
    </form>
  </div>

  {#if data.posts.length === 0}
    <p class="text-center">looking empty...</p>
  {:else}
    <div class="flex w-full justify-center">
      <div class="w-1/3 space-y-3">
        {#each data.posts as post}
          <Post {post} />
        {/each}
      </div>
    </div>
  {/if}
</main>

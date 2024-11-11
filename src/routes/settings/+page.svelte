<script lang="ts">
  import { page } from "$app/stores";
  import type { PageServerData } from "./$types";

  const { data }: { data: PageServerData } = $props();

  let nickname = $state(data.nickname);
  let bio = $state(data.bio);

  async function upload(event: SubmitEvent) {
    event.preventDefault();
    const form = new FormData(event.target as HTMLFormElement);

    const res = await fetch("/api/settings/pfp", {
      headers: {
        Authorization: $page.data.session,
      },
      method: "POST",
      body: form,
    });

    const result = await res.json();
    alert(result.message);
  }

  async function updateProfile(event: SubmitEvent) {
    const res = await fetch("/api/settings/info", {
      headers: {
        Authorization: $page.data.session,
      },
      method: "POST",
      body: JSON.stringify({ nickname, bio }),
    });

    const result = await res.json();
    alert(result.message);
    window.location.href = "/settings";
  }

  let src = `/api/pfp/${$page.data.user.id}`;

  $effect(() => {
    nickname = data.nickname;
    bio = data.bio;
  });
</script>

<main>
  <div class="grid lg:grid-cols-2 grid-cols-1 gap-4">
    <div class="p-5 rounded-md border border-zinc-400 bg-zinc-50">
      <h3 class="text-3xl font-semibold">profile pic</h3>
      <p>for now, only png is accepted.</p>

      <img {src} alt="current profile pic" class="size-16 rounded-md" />

      <form
        class="my-4"
        enctype="multipart/form-data"
        onsubmit={async (e) => await upload(e)}
      >
        <input type="file" accept=".png" name="pfp" required />
        <button type="submit">upload</button>
      </form>
    </div>

    <div class="p-5 rounded-md border border-zinc-400 bg-zinc-50">
      <h3 class="text-3xl font-semibold">public profile</h3>
      <p>what people see on your profile</p>

      <form class="my-4" onsubmit={async (e) => await updateProfile(e)}>
        <p>nickname (display name)</p>
        <input type="text" bind:value={nickname} />

        <p>bio</p>
        <input type="text" bind:value={bio} />

        <button type="submit">update</button>
      </form>
    </div>
  </div>

  <a href="/api/logout" class="button !bg-red-500">log out</a>
</main>

<script lang="ts">
  import { page } from "$app/stores";

  async function upload(event: SubmitEvent) {
    const form = new FormData(event.target as HTMLFormElement);

    const res = await fetch("/api/settings/pfp", {
      headers: {
        Authorization: $page.data.session,
      },
      method: "POST",
      body: form,
    });

    const result = await res.json();
    alert(JSON.stringify(result));
  }

  let src = `content/profile/picture/${$page.data.user.id}.png`;
</script>

<main>
  <h3 class="text-3xl font-semibold">profile pic</h3>
  <p>for now, only png is accepted.</p>

  <img {src} alt="current profile pic" class="size-16" />

  <form
    class="my-4"
    enctype="multipart/form-data"
    on:submit|preventDefault={async (e) => await upload(e)}
  >
    <input type="file" accept=".png" name="pfp" required />
    <button type="submit">upload</button>
  </form>

  <a href="/api/logout" class="button !bg-red-500">log out</a>
</main>

<script lang="ts">
  const props = $props();
</script>

<nav class="p-4 bg-sky-500 text-white w-full flex items-center justify-between">
  <a href="/" class="text-3xl font-bold">quark</a>

  <div class="gap-2 flex items-center">
    {#if props.user.auth}
      <a
        href="/feed"
        class="text-xl font-semibold hover:bg-sky-600 duration-300 rounded-md px-4 py-2"
        >feed</a
      >

      <a
        href="/explore"
        class="text-xl font-semibold hover:bg-sky-600 duration-300 rounded-md px-4 py-2"
        >explore</a
      >

      <a
        href="/settings"
        class="text-xl font-semibold hover:bg-sky-600 duration-300 rounded-md px-4 py-2"
        >settings</a
      >

      <a
        href={`/user/${props.user.profile.user}`}
        class="text-xl flex gap-2 items-center font-semibold hover:bg-sky-600 duration-300 rounded-md px-4 py-2"
      >
        <img
          src={`/api/pfp/${props.user.profile.id}`}
          alt="pfp"
          class="size-6 bg-white rounded-md"
        />
        <p>{props.user.profile.nickname}</p>
      </a>
    {:else}
      <a
        href="/login"
        class="text-xl font-semibold hover:bg-sky-600 duration-300 rounded-md px-4 py-2"
        >login</a
      >

      <a
        href="/register"
        class="text-xl font-semibold hover:bg-sky-600 duration-300 rounded-md px-4 py-2"
        >register</a
      >
    {/if}
  </div>
</nav>

<script lang="ts">
  import {
    MessagesSquare,
    Globe,
    Settings,
    LogIn,
    UserPlus,
  } from "lucide-svelte";

  let { user } = $props();
</script>

<nav
  class="p-4 sticky top-0 z-10 bg-sky-500 text-white w-full flex items-center justify-between"
>
  <a href="/" class="text-3xl font-bold">quark</a>

  <div class="gap-2 flex items-center">
    {#if user.auth}
      <a
        href="/feed"
        class="text-xl font-semibold flex items-center gap-3 hover:bg-sky-600 duration-300 rounded-md px-4 py-2"
        ><MessagesSquare size={22} />
        <span class="lg:block hidden">feed</span></a
      >
    {/if}

    <a
      href="/explore"
      class="text-xl font-semibold flex items-center gap-3 hover:bg-sky-600 duration-300 rounded-md px-4 py-2"
      ><Globe size={22} />
      <span class="lg:block hidden">explore</span></a
    >

    {#if user.auth}
      <a
        href="/settings"
        class="text-xl font-semibold flex items-center gap-3 hover:bg-sky-600 duration-300 rounded-md px-4 py-2"
        ><Settings size={22} />
        <span class="lg:block hidden">settings</span></a
      >

      <a
        href={`/user/${user.profile.user}`}
        class="text-xl flex gap-2 items-center font-semibold hover:bg-sky-600 duration-300 rounded-md px-4 py-2"
      >
        <img
          src={`/api/pfp/${user.profile.id}`}
          alt="pfp"
          class="size-6 bg-white rounded-md"
        />
        <p class="lg:block hidden">{user.profile.nickname}</p>
      </a>
    {:else}
      <a
        href="/login"
        class="text-xl font-semibold flex items-center gap-3 hover:bg-sky-600 duration-300 rounded-md px-4 py-2"
        ><LogIn size={22} />
        <span class="lg:block hidden">login</span></a
      >

      <a
        href="/register"
        class="text-xl font-semibold flex items-center gap-3 hover:bg-sky-600 duration-300 rounded-md px-4 py-2"
        ><UserPlus size={22} />
        <span class="lg:block hidden">register</span></a
      >
    {/if}
  </div>
</nav>

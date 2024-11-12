<script lang="ts">
  const props: {
    id: string;
  } = $props();

  let user = $state({
    name: "ghost",
    nickname: "[unknown]",
  });

  async function fetchUser() {
    const res = await fetch(`/api/user/${props.id}`, {
      method: "GET",
    });

    const json = await res.json();
    user = {
      name: json.username,
      nickname: json.nickname,
    };
  }

  $effect(() => {
    fetchUser();
  });
</script>

<div
  class="bg-zinc-50 p-2 border border-zinc-300 flex items-center gap-2 rounded-md text-lg font-bold hover:scale-[102.5%] duration-200"
>
  <img
    src={`/api/pfp/${props.id}`}
    alt="profile pic"
    class="size-10 rounded-md border border-zinc-300"
  />
  <a href={`/user/${user.name}`}>{user.nickname} (@{user.name})</a>
</div>

<script lang="ts">
  const props = $props()
</script>

<nav class="p-4 bg-sky-500 text-white">
  <h2 class="text-3xl font-semibold">quake</h2>
  <p>{props.user.name}</p>
</nav>
<script lang="ts">
  import Nav from "$lib/components/Nav.svelte";
  import type { LayoutData } from "./$types";
  import type { Snippet } from "svelte";
  import "../app.css";

  let {
    children,
    data,
  }: {
    children: Snippet;
    data: LayoutData;
  } = $props();

  let user = $state(data.user);
</script>

<Nav
  user={{
    auth: JSON.stringify(data.user) === "{}" ? false : true,
    profile: user,
  }}
/>

<div class="px-8 py-4">
  {@render children()}
</div>

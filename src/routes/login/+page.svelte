<script lang="ts">
  let username = "";
  let password = "";

  async function login() {
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!data.valid) {
      alert(data.message);
      return;
    }

    alert(data.token);
  }
</script>

<main>
  <h1 class="text-3xl font-bold">login</h1>

  <form on:submit={login} class="grid grid-cols-1 gap-2 w-64">
    <input type="text" bind:value={username} />
    <input type="password" bind:value={password} />

    <input type="submit" value="login" />
  </form>
</main>

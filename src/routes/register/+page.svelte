<script lang="ts">
  let email = "";
  let username = "";
  let password = "";

  async function register() {
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, username, password }),
    });

    const data = await res.json();

    if (!data.valid) {
      alert(data.message);
      return;
    }

    alert(data.message);
  }
</script>

<main>
  <h1 class="text-3xl font-bold">register</h1>

  <form on:submit={register} class="grid grid-cols-1 gap-4 w-64">
    <input type="text" bind:value={username} />
    <input type="email" bind:value={email} />
    <input type="password" bind:value={password} />

    <input type="submit" value="register" />
  </form>
</main>

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

    window.location.href = "/feed";
  }
</script>

<main>
  <div
    class="bg-zinc-50 border-zinc-500 border rounded-lg p-6 flex justify-center sm:w-full lg:w-1/5 mx-auto"
  >
    <div class="w-full">
      <h1 class="text-3xl font-bold text-center">login</h1>
      <hr class="my-3 border-b-[1px] border-b-zinc-500" />
      <form on:submit={login} class="grid grid-cols-1 gap-2 sm:w-full">
        <div class="space-y-1">
          <p>username</p>
          <input
            type="text"
            class="w-full"
            placeholder="mycoolusername"
            bind:value={username}
          />
        </div>

        <div class="space-y-1">
          <p>password</p>
          <input
            type="password"
            class="w-full"
            placeholder="supersecretpassword123"
            bind:value={password}
          />
        </div>

        <input type="submit" class="mt-2" value="login" />
      </form>
    </div>
  </div>
</main>

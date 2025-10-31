<script lang="ts">
  import Login from "./screens/Login.svelte";
  import { isLoggedIn } from "./api/state.svelte";
  import Home from "./screens/Home.svelte";

  let logged = $state(false);

  isLoggedIn.subscribe((value) => {
    logged = value;
  });
</script>

{#if logged}
  <Home />
{:else}
  <Login />
{/if}
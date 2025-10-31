<script lang="ts">
  import { onMount } from "svelte";
  import { fly, fade } from "svelte/transition";
  import { login } from "../api/user";

  let isVisible = $state(false);
  let emailIsInvalid = $state(false);

  let showingError = $state(false);
  let errorMessage = $state("");

  onMount(() => (isVisible = true));

  let email = $state("");
  let password = $state("");

  function doLogin() {
    if (email == "" || password == "") {
      showError("Preencha todos os campos!");
      return;
    }

    const pattern =
      /[a-zA-Z0-9._%+-]+@(gmail|hotmail|outlook|yahoo|tutanota|tuta)\.(com|br|net)/;

    emailIsInvalid = !pattern.test(email);

    if (emailIsInvalid) {
      showError("Endereço de email inválido!");
      return;
    }

    login(email, password, (message) => {
      showError(message);
    });
  }

  function showError(message: string) {
    errorMessage = message;
    showingError = true;
    setTimeout(() => (showingError = false), 5000);
  }
</script>

<div class="background">
  {#if isVisible}
    <div class="login-form-container" in:fly={{ y: 30, duration: 750 }}>
      <img src="/small_name.png" class="logo" height="auto" alt="OpenForms" />

      <input type="email" placeholder="Email" bind:value={email} />
      <input type="password" placeholder="Senha" bind:value={password} />

      <button onclick={doLogin}>Login</button>
    </div>
  {/if}

  {#if showingError}
    <div
      class="error-container"
      in:fly={{ x: 20, duration: 300 }}
      out:fade={{ duration: 300 }}
    >
      <div class="error-box">
        <p>{errorMessage}</p>
      </div>
    </div>
  {/if}
</div>

<style>
  .background {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-image: url("/bg.png");
  }

  .login-form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    background-color: #fff8f2;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  }

  .logo {
    width: 250px;
    margin-top: 32px;
    margin-bottom: 32px;
  }

  input {
    margin-bottom: 32px;
    margin-left: 32px;
    margin-right: 32px;
    width: 400px;
    padding: 18px 18px;
  }

  button {
    margin-bottom: 32px;
  }

  .error-container {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 20px;
    justify-self: end;
    bottom: 0;
  }

  .error-box {
    display: flex;
    width: 400px;
    padding: 16px;
    margin-bottom: 75px;
    align-items: center;
    justify-content: center;
    background-color: #ba1a1a;
    border-radius: 10px;
    border: 1px solid #ffdad625;
  }

  .error-box > p {
    color: #ffdad6;
    text-align: start;
    width: 100%;
  }

  @media (max-width: 645px) {
    .logo {
      width: 200px;
    }

    .login-form-container {
      width: 95%;
    }

    button {
      width: 90%;
    }

    input {
      width: 80%;
      padding: 18px 18px;
    }

    .error-box > p {
      color: #ffdad6;
      text-align: start;
      font-size: 0.8rem;
      width: 100%;
    }
  }
</style>

<script lang="ts">
  import { Stretch } from "svelte-loading-spinners";
  import { fade } from "svelte/transition";
</script>

<div class="loader-background" out:fade>
  <Stretch size="75" color="#000" unit="px" duration="1s" />
  <p>Carregando suas informações...</p>
</div>

<style>
  .loader-background {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-color: #fff8f2;
    z-index: 100;
  }

  .loader-background > p {
    margin-top: 16px;
    font-weight: bolder;
    font-size: 1.25rem;
    user-select: none;
  }

  @media (max-width: 645px) {
    .loader-background {
      height: 100%;
    }
  }
</style>

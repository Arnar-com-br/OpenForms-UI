<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet<[]>;
    onClick: Function;
  }

  let props: Props = $props();
</script>

<button onclick={() => props.onClick()} class={"not-active-button"}>
  {@render props.children?.()}
</button>

<style>
  .not-active-button {
    font-size: 0.9rem;
    font-weight: normal;
    color: #000;
    width: 24px;
    height: 24px;
    padding: 0 0;
    border: none;
    border-radius: 5px;
    background-color: #fff8f2;
    border: 2px solid #000;
    cursor: pointer;
  }

  .not-active-button:hover {
    background-color: #e4ded8;
  }

  .not-active-button:active {
    background-color: #b9b5b0;
  }
</style>

<script lang="ts">
  import type { Entry } from "../api/entity";
  import { calculatePages, getFirst, getLast } from "../util/entry";
  import PagerButton from "./PagerButton.svelte";

  interface Props {
    entries: Entry[];
    filteredEntries: Entry[];
    openPopup: (entry: Entry) => void;
    setPage: (page: number) => void;
  }

  let props: Props = $props();
</script>

<div class="table-container">
  <div class="table-container-footer">
    {#if props.filteredEntries.length > 0}
      <p>
        <span class="black"
          >{getFirst(props.filteredEntries).id} a {getLast(
            props.filteredEntries
          ).id}</span
        >
        de {props.entries.length} items
      </p>

      <div class="pages-container">
        {#each calculatePages(props.entries) as pagenum}
          <PagerButton onClick={() => props.setPage(pagenum)}>
            {pagenum}
          </PagerButton>
        {/each}
      </div>
    {/if}
  </div>

  {#each props.filteredEntries as entry}
    <div
      class="entry"
      onclick={() => props.openPopup(entry)}
      role="presentation"
    >
      <div
        class="cell"
        style={`${entry.visualized ? "" : "background-color: #FFFCC8;"}`}
      >
        <p>Nome</p>
        <p>{entry.name}</p>
      </div>
      <div
        class="cell"
        style={`${entry.visualized ? "" : "background-color: #FFFCC8;"}`}
      >
        <p>Telefone</p>
        <p>{entry.phoneNumber}</p>
      </div>
      <div
        class="cell"
        style={`${entry.visualized ? "" : "background-color: #FFFCC8;"}`}
      >
        <p>Email</p>
        <p>{entry.email}</p>
      </div>
      <div
        class="cell"
        style={`${entry.visualized ? "" : "background-color: #FFFCC8;"}`}
      >
        <p>Mensagem</p>
        <p>{entry.message}</p>
      </div>
    </div>
  {/each}
</div>

<style>
  .entry {
    margin-bottom: 32px;
    transition: transform 0.4s ease;
  }

  .entry:active {
    opacity: 0.6;
    cursor: pointer;
  }

  .cell {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 16px 0;
    border-bottom: 1.25px solid #00000025;
    border-top: 1.25px solid #00000025;
  }

  .cell > p {
    padding: 0 4px;
  }

  .pages-container {
    display: flex;
    gap: 4px;
  }

  .table-container-footer {
    display: flex;
    justify-content: space-between;
    width: 100%;

    margin-top: 0px;
    margin-bottom: 32px;
  }

  .table-container {
    display: flex;
    flex-direction: column;
    width: 100%;

    transition: transform 0.4s ease;
  }
</style>

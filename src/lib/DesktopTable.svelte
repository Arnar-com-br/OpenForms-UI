<script lang="ts">
  import { calculatePages, getFirst, getLast, type Entry } from "../util/entry";
  import Cell from "./Cell.svelte";
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
  <div>
    <div class="table-line">
      <Cell text="Nome" isHeader={true} style="width: 320px" />
      <Cell text="Telefone" isHeader={true} style="width: 440px" />
      <Cell text="Email" isHeader={true} style="width: 750px" />
      <Cell text="Mensagem" isHeader={true} style="width: 100%" />
    </div>

    {#each props.filteredEntries as entry}
      <div
        class="table-line table-content"
        onclick={() => props.openPopup(entry)}
        role="presentation"
      >
        <Cell
          text={entry.name.substring(0, 12)}
          style={`width: 320px; ${entry.visualized ? "" : "background-color: #FFFCC8;"}`}
        />
        <Cell
          text={entry.phoneNumber}
          style={`width: 440px; ${entry.visualized ? "" : "background-color: #FFFCC8;"}`}
        />
        <Cell
          text={entry.email}
          style={`width: 750px; ${entry.visualized ? "" : "background-color: #FFFCC8;"}`}
        />
        <Cell
          text={entry.message.substring(0, 128)}
          style={`width: 100%; ${entry.visualized ? "" : "background-color: #FFFCC8;"}`}
        />
      </div>
    {/each}
  </div>

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
</div>

<style>
  .table-line {
    display: flex;
  }

  .pages-container {
    display: flex;
    gap: 4px;
  }

  .table-container-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 32px;
    width: 100%;
  }

  .table-container {
    display: flex;
    flex-direction: column;
    width: 80%;

    transition: transform 0.4s ease;
  }

  .table-content:hover {
    opacity: 0.8;
    cursor: pointer;
  }

  .table-content:active {
    opacity: 0.6;
    cursor: pointer;
  }

  @media (max-width: 1000px) {
    .table-container {
      width: 100%;
    }
  }

  @media (max-width: 800px) {
    .table-container {
      width: 100%;
      flex-direction: column-reverse;
    }

    .table-container-footer {
      margin-top: 0px;
      margin-bottom: 32px;
    }
  }

  @media (max-width: 800px) {
    .table-container {
      width: 100%;
      flex-direction: column-reverse;
    }

    .table-container-footer {
      margin-top: 0px;
      margin-bottom: 32px;
    }
  }

  @media (max-width: 645px) {
    .table-container {
      width: 100%;
      flex-direction: column-reverse;
    }

    .table-container-footer {
      margin-top: 0px;
      margin-bottom: 32px;
    }
  }
</style>

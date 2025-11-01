<script lang="ts">
  import { onMount } from "svelte";
  import { formsForMe, me, visualizeForm } from "../api/user";
  import type { Entry, User } from "../api/entity";
  import { getPage } from "../util/entry";
  import PopupWindow from "../lib/PopupWindow.svelte";
  import Loader from "../lib/Loader.svelte";
  import DesktopTable from "../lib/DesktopTable.svelte";
  import MobileTable from "../lib/MobileTable.svelte";

  let loading = $state(true);

  let popupOpen = $state(false);
  let popupEntry = $state<Entry>();

  let user = $state<User>();

  let entries = $state<Entry[]>([]);
  let filteredEntries = $state<Entry[]>([]);

  let isMobile = $state(false);

  function setPage(num: number) {
    filteredEntries = getPage(entries, num);
  }

  function openPopup(entry: Entry) {
    popupEntry = entry;
    popupOpen = true;

    if (!entry.visualized) {
      entry.visualized = true;
      visualizeForm(entry);
    }
  }

  function closePopup() {
    popupOpen = false;
  }

  function updateMatch() {
    isMobile = window.matchMedia("(max-width: 645px)").matches;
  }

  onMount(async () => {
    user = await me();
    
    try {
      entries = (await formsForMe()).reverse();
    } catch (err) {
      entries = []
    }

    filteredEntries = getPage(entries, 1);
    loading = false;

    updateMatch()

    const media = window.matchMedia("(max-width: 645px)");
    media.addEventListener("change", updateMatch);
  });
</script>

{#if loading}
  <Loader />
{/if}

{#if popupOpen}
  <PopupWindow onDissmiss={closePopup} entry={popupEntry!!} />
{/if}

<header>
  <img
    src="/small_name.png"
    class="logo"
    width="164"
    height="auto"
    alt="OpenForms"
  />
</header>

<div class="content">
  <p class="small-company-name">{user?.companyName}</p>
  <h1>Mensagens para sua empresa</h1>
  <p class="description">
    Clique em uma mensagem para ver todas as informações.<br />
    Mensagens que ainda não foram lidas aparecerão destacadas em amarelo.
  </p>

  {#if isMobile}
    <MobileTable {entries} {filteredEntries} {openPopup} {setPage} />
  {:else}
    <DesktopTable {entries} {filteredEntries} {openPopup} {setPage} />
  {/if}
</div>

<style>
  header {
    width: 100%;
    padding: 16px 32px;
    border-bottom: 1px solid #00000025;
  }

  .content {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0px 128px;
    justify-content: start;
    margin-top: 32px;
    margin-bottom: 64px;
  }

  .small-company-name {
    text-align: left;
    font-size: 1rem;
    font-weight: 300;
  }

  h1 {
    margin-top: 8px;
    text-align: left;
    font-size: 2rem;
    font-weight: bold;
  }

  .description {
    margin-top: 4px;
    margin-bottom: 32px;
    text-align: left;
    font-size: 1rem;
    font-weight: 400;
  }

  @media (max-width: 1000px) {
    .content {
      width: 92%;
      padding: 0px 32px;
    }
  }

  @media (max-width: 645px) {
    .content {
      width: 93vw;
      padding: 0px 16px;
    }

    .small-company-name {
      font-size: 0.9rem;
    }

    h1 {
      margin-top: 16px;
      font-size: 1.75rem;
    }

    .description {
      margin-top: 4px;
      margin-bottom: 32px;
      font-size: 0.9rem;
    }
  }
</style>

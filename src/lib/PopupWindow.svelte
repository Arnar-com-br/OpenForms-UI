<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { convertTime } from "../util/entry";
  import type { Entry } from "../api/entity";

  interface Props {
    onDissmiss: Function;
    entry: Entry;
  }

  let props: Props = $props();
</script>

<div
  class="popup-background"
  transition:fade
  onclick={() => props.onDissmiss()}
  role="presentation"
>
  <div
    class="popup-window"
    transition:fly
    onclick={(e) => e.stopPropagation()}
    role="presentation"
  >
    <p>
      <span class="black">Enviado em:</span>
      {convertTime(props.entry.createdAt)}
    </p>
    <p>
      <span class="black">Nome:</span>
      {props.entry.name}
    </p>
    <p>
      <span class="black">Telefone:</span>
      {props.entry.phoneNumber}
    </p>
    <p>
      <span class="black">Email:</span>
      {props.entry.email}
    </p>
    <p>
      <span class="black">Mensagem:</span> {props.entry.message}
    </p>

    <div class="popup-actions">
      <button onclick={() => window.open(`mailto:${props.entry.email}`)}
        >Responder por Email</button
      >
      <button
        onclick={() => window.open(`https://wa.me/${props.entry.phoneNumber}`)}
        >Responder pelo Whatsapp</button
      >
    </div>
  </div>
</div>

<style>
  .popup-background {
    position: absolute;
    background-color: #0000008f;
    width: 100%;
    height: 100%;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .popup-window {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 32px;
    background-color: #fff8f2;
    border-radius: 10px;
  }

  .popup-window > p {
    width: 600px;
    font-weight: 300;
    font-size: 1rem;
    line-height: 18px;
  }

  .popup-actions {
    display: flex;
    gap: 32px;
    align-items: center;
    justify-content: center;
    margin-top: 64px;
  }

  .popup-actions > button {
    padding: 18px 18px;
  }

  @media (max-width: 680px) {
    .popup-window > p {
      width: 100%;
      font-weight: 300;
      font-size: 1rem;
      line-height: 18px;
    }

    .popup-window {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 32px 16px;
      background-color: #fff8f2;
      border-radius: 10px;
      width: 80vw;
      box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    }

    .popup-actions {
      gap: 16px;
      margin-top: 64px;
    }
  }
</style>

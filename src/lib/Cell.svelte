<script lang="ts">
  interface Props {
    text: String;
    isHeader?: Boolean;
    style?: string | undefined | null
  }

  let props: Props = $props();
</script>

<div class={props.isHeader ? "" : "content-cell"} style={props.style}>
  <p>{props.text}</p>
</div>

<style>
  div {
    display: flex;
    flex-direction: row;
    background-color: #d9d9d9;
    padding: 16px 8px;
    width: 320px;
    text-align: start;
    align-items: center;
    border: 1.5px solid #00000025;
  }
  div > p {
    text-align: left;
  }

  .content-cell {
    background-color: #fff8f2;
    padding: 8px 8px;
  }
</style>

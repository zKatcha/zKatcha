<script lang="ts">
  import type { DealerHandInfo, Card as CardInfo } from "../../types";
  import Card from "./Card.svelte";

  export let card1: CardInfo;
  export let card2: CardInfo;
  export let card3: CardInfo;
  export let card4: CardInfo;
  export let card5: CardInfo;
</script>

<dealer-board>
  <cards>
    <Card card={card1} />
    <Card card={card2} />
    <Card card={card3} />
    <Card card={card4} />
    <Card card={card5} />
  </cards>
  <player-name>Board</player-name>
</dealer-board>

<style>
  dealer-board {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  cards {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
    padding: 10px;
  }
  player-hand {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 10px;
    gap: 4px;

    /* width: 184px;
    height: 148px; */

    flex: none;
    order: 0;
    flex-grow: 0;
  }
</style>

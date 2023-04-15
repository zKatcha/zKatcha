<script lang="ts">
  import Card from "./Card.svelte";
  import type { Card as CardType } from "../../types";

  export let card1: CardType;
  export let card2: CardType;
  export let playerName = "Player";
</script>

<player>
  <player-hand>
    <Card card={card1} />
    <Card card={card2} />
  </player-hand>
  <player-name>{playerName}</player-name>
</player>

<style>
  player {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0px;

    /* width: auto;
    height: auto; */

    flex: none;
    order: 0;
    flex-grow: 0;
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

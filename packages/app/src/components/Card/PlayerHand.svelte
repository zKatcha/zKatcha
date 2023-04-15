<script lang="ts">
  import Card from "./Card.svelte";

  let suit: "D" | "C" | "H" | "S" = "S";
  let value: "A" | "2" | "3" | "4" | "5" | "6" | "7" | "10" | "J" | "Q" | "K" = "A";
  let playerName = "Player 1";
</script>

<player>
  <player-hand>
    <Card />
    <Card />
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

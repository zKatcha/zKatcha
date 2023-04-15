<script lang="ts">
  import type { Card } from "../../types";

  export let card: Card = {
    suit: "",
    value: "",
  };
</script>

<card-container>
  <card-suit>{card?.suit}</card-suit>
  <card-value>{card?.value}</card-value>
</card-container>

<style>
  card-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;

    width: 80px;
    height: 128px;

    border-width: 0.5px 1px 4px 0.5px;
    border-style: solid;
    border-color: #000000;
    border-radius: 16px;

    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 0;
  }

  card-suit {
    font-size: 2rem;
    font-weight: bold;
  }

  card-value {
    font-size: 3rem;
    font-weight: bold;
  }
</style>

<script lang="ts">
  import type { Card } from "../../types";
  import Club from "../../public/images/club.svg";
  import Heart from "../../public/images/heart.svg";
  import Diamond from "../../public/images/diamond.svg";
  import Spade from "../../public/images/spade.svg";

  export let card: Card = {
    suit: "",
    value: "",
  };

  let suitMap = {
    "": "",
    C: Club,
    D: Diamond,
    H: Heart,
    S: Spade,
  };
</script>

<card-container>
  {#if card?.suit}
    <card-suit>
      <!-- {card?.suit} -->
      <img style={"width: 25px; height: 25px;"} src={suitMap[card?.suit]} alt=" " />
    </card-suit>
    <card-value>{card?.value}</card-value>
  {/if}
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

  @keyframes fadeInAnimation {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  card-suit {
    font-size: 2rem;
    font-weight: bold;
    animation: fadeInAnimation 0.5s ease-in-out;
  }

  card-value {
    font-size: 3rem;
    font-weight: bold;
    animation: fadeInAnimation 0.5s ease-in-out;
  }
</style>

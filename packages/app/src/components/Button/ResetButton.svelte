<script lang="ts">
  import { currentDeck, gameState, handInfo } from "../../stores";
  import { defaultDeck } from "../../constants";
  import type { Card, HandInfo } from "../../types";

  function handleClick() {
    console.log("Button clicked");
    console.log(defaultDeck);
    let newDeck: Card[] = [];
    for (let item of defaultDeck) {
      newDeck.push(item);
    }
    currentDeck.update(() => newDeck);
    handInfo.set({} as HandInfo);
    gameState.set(0);
  }
</script>

<button on:click={handleClick}>
  <button-text>Reset</button-text>
</button>

<style>
  /* your styles go here */
  button {
    /* Buttons */

    box-sizing: border-box;

    /* Auto layout */

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 16px;
    gap: 8px;

    width: 100%;
    height: 40px;

    background: #000000;
    border-radius: 10px;

    /* Inside auto layout */
  }
  button-text {
    /* NEXT */

    width: auto;
    height: 21px;

    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
    /* identical to box height */

    display: flex;
    align-items: center;
    text-align: center;

    color: #ffffff;

    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 0;
  }
</style>

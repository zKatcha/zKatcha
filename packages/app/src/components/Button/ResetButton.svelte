<script lang="ts">
  import { currentDeck, defaultDeck, gameState, handInfo } from "../../stores";
  import type { Card, HandInfo } from "../../types";

  let _maxGameStates: number;
  let _gameState: number;
  let _handState: HandInfo;
  let _currentDeck: Card[];
  let _cardIndex: number;
  let _currentRandom: number;

  function handleClick() {
    console.log("Button clicked");
    currentDeck.set(defaultDeck);
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

    width: 36px;
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

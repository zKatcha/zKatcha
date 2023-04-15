<script lang="ts">
  import { gameState, handInfo, maxGameStates } from "../../stores";
  import type { HandInfo } from "../../types";

  let _maxGameStates: number;
  let _gameState: number;
  let _handState: HandInfo;

  maxGameStates.subscribe((value) => {
    _maxGameStates = value;
  });

  gameState.subscribe((value) => {
    _gameState = value;

    // Mock Code (Update Game Board)
    let newHandState: HandInfo;
    if (_gameState == 1) {
      newHandState = {
        ..._handState,
        player1: { card1: { suit: `S`, value: `A` } },
      };
    } else if (_gameState == 2) {
      newHandState = {
        ..._handState,
        player2: { card1: { suit: `H`, value: `A` } },
      };
    } else if (_gameState == 3) {
      newHandState = {
        ..._handState,
        player3: { card1: { suit: `C`, value: `A` } },
      };
    } else if (_gameState == 4) {
      newHandState = {
        ..._handState,
        player4: { card1: { suit: `D`, value: `A` } },
      };
    } else if (_gameState == 5) {
      newHandState = {
        ..._handState,
        player1: { card1: { suit: `S`, value: `A` }, card2: { suit: `S`, value: `K` } },
      };
    } else if (_gameState == 6) {
      newHandState = {
        ..._handState,
        player2: { card1: { suit: `H`, value: `A` }, card2: { suit: `H`, value: `K` } },
      };
    } else if (_gameState == 7) {
      newHandState = {
        ..._handState,
        player3: { card1: { suit: `C`, value: `A` }, card2: { suit: `C`, value: `K` } },
      };
    } else if (_gameState == 8) {
      newHandState = {
        ..._handState,
        player4: { card1: { suit: `D`, value: `A` }, card2: { suit: `D`, value: `K` } },
      };
    } else if (_gameState == 9) {
      newHandState = {
        ..._handState,
        dealer: { card1: { suit: `S`, value: `8` } },
      };
    } else if (_gameState == 10) {
      newHandState = {
        ..._handState,
        dealer: { card1: { suit: `S`, value: `8` }, card2: { suit: `S`, value: `9` } },
      };
    } else if (_gameState == 11) {
      newHandState = {
        ..._handState,
        dealer: {
          card1: { suit: `S`, value: `8` },
          card2: { suit: `S`, value: `9` },
          card3: { suit: `S`, value: `10` },
        },
      };
    } else if (_gameState == 12) {
      newHandState = {
        ..._handState,
        dealer: {
          card1: { suit: `S`, value: `8` },
          card2: { suit: `S`, value: `9` },
          card3: { suit: `S`, value: `10` },
          card4: { suit: `S`, value: `J` },
        },
      };
    } else if (_gameState == 13) {
      newHandState = {
        ..._handState,
        dealer: {
          card1: { suit: `S`, value: `8` },
          card2: { suit: `S`, value: `9` },
          card3: { suit: `S`, value: `10` },
          card4: { suit: `S`, value: `J` },
          card5: { suit: `S`, value: `Q` },
        },
      };
    } else {
      newHandState = {};
    }

    handInfo.set(newHandState);
  });

  handInfo.subscribe((value) => {
    _handState = value;
  });

  function handleClick() {
    gameState.update((value) => {
      if (value > _maxGameStates - 1) {
        return 0;
      } else {
        return value + 1;
      }
    });
    console.log("Button clicked");
  }
</script>

<button on:click={handleClick}>
  <button-text>Next</button-text>
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

    background: #222222;
    border-bottom: 4px solid #000000;
    box-shadow: 0px 0px 4px #000000;
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

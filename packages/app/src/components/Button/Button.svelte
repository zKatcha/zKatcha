<script lang="ts">
  import {
    cardIndex,
    currentDeck,
    currentRandom,
    gameState,
    handInfo,
    maxGameStates,
  } from "../../stores";
  import type { Card, HandInfo } from "../../types";

  let _maxGameStates: number;
  let _gameState: number;
  let _handState: HandInfo;
  let _currentDeck: Card[];
  let _cardIndex: number;
  let _currentRandom: number;

  maxGameStates.subscribe((value) => {
    _maxGameStates = value;
  });

  currentDeck.subscribe((value) => {
    _currentDeck = value;
  });

  cardIndex.subscribe((value) => {
    _cardIndex = value;
  });

  currentRandom.subscribe((value) => {
    _currentRandom = value;
  });

  function getCard(): Card {
    // Generate Random Number
    _cardIndex = Math.floor(Math.random() * 100) % _currentDeck.length;
    let selectedCard: Card | undefined;
    if (_currentDeck.length > 0) {
      let spliced = _currentDeck.splice(_cardIndex, 1);
      currentDeck.set(_currentDeck);
      selectedCard = spliced[0];
    } else {
      selectedCard = { suit: ``, value: `` };
    }
    return selectedCard;
  }

  gameState.subscribe((value) => {
    _gameState = value;

    // Mock Code (Update Game Board)
    let newHandState: HandInfo;
    let newCard: Card = getCard();
    console.log("🚀 | gameState.subscribe | newCard:", newCard);
    if (_gameState == 1) {
      newHandState = {
        ..._handState,
        player1: { card1: newCard },
      };
    } else if (_gameState == 2) {
      newHandState = {
        ..._handState,
        player2: { card1: newCard },
      };
    } else if (_gameState == 3) {
      newHandState = {
        ..._handState,
        player3: { card1: newCard },
      };
    } else if (_gameState == 4) {
      newHandState = {
        ..._handState,
        player4: { card1: newCard },
      };
    } else if (_gameState == 5) {
      newHandState = {
        ..._handState,
        player1: { ..._handState.player1, card2: newCard },
      };
    } else if (_gameState == 6) {
      newHandState = {
        ..._handState,
        player2: { ..._handState.player2, card2: newCard },
      };
    } else if (_gameState == 7) {
      newHandState = {
        ..._handState,
        player3: { ..._handState.player3, card2: newCard },
      };
    } else if (_gameState == 8) {
      newHandState = {
        ..._handState,
        player4: { ..._handState.player4, card2: newCard },
      };
    } else if (_gameState == 9) {
      newHandState = {
        ..._handState,
        dealer: { card1: newCard },
      };
    } else if (_gameState == 10) {
      newHandState = {
        ..._handState,
        dealer: { ..._handState.dealer, card2: newCard },
      };
    } else if (_gameState == 11) {
      newHandState = {
        ..._handState,
        dealer: {
          ..._handState.dealer,
          card3: newCard,
        },
      };
    } else if (_gameState == 12) {
      newHandState = {
        ..._handState,
        dealer: {
          ..._handState.dealer,
          card4: newCard,
        },
      };
    } else if (_gameState == 13) {
      newHandState = {
        ..._handState,
        dealer: {
          ..._handState.dealer,
          card5: newCard,
        },
      };
    } else {
      newHandState = {} as HandInfo;
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
    console.log(Math.floor(Math.random() * 100) % 52);

    // Set Random

    // Set Card Index

    // Set Cards Left
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

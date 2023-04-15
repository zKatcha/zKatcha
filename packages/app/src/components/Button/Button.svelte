<script lang="ts">
  import {
    cardIndex,
    currentDeck,
    currentRandom,
    gameHash,
    gameState,
    handInfo,
    maxGameStates,
    secretInfo,
  } from "../../stores";
  import type { Card, HandInfo, SecretInfo } from "../../types";
  import { defaultDeck } from "../../constants";
  import { RandomProver } from "@minamal/zk";

  import { Field, Proof, SelfProof, isReady } from "snarkyjs";
  import { ethers } from "ethers";

  let _maxGameStates: number;
  let _gameState: number;
  let _handState: HandInfo;
  let _secretState: SecretInfo;
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

  secretInfo.subscribe((value) => {
    _secretState = value;
  });

  function generateUserSecret() {
    let random = Math.floor(Math.random() * 10000);
    return random;
  }

  async function generateHash(secret: number) {
    let prover = new RandomProver();
    await isReady;
    console.log(`Ready`);
    let secretField = new Field(secret);
    let hash = prover.poseidon([secretField]);

    // let hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(secret.toString()));
    return hash;
  }

  function getCard(): Card {
    // Generate Random Number
    let _randomNumber = Math.floor(Math.random() * 100);
    currentRandom.set(_randomNumber);
    _cardIndex = _randomNumber % _currentDeck.length;
    cardIndex.set(_cardIndex);
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

  gameState.subscribe(async (value) => {
    _gameState = value;

    // Mock Code (Update Game Board)
    let newHandState: HandInfo;
    let newSecretState: SecretInfo;
    let newCard;
    if (_gameState > 6) {
      newCard = getCard();
    }

    if (_gameState == 1) {
      let secret = generateUserSecret();
      let hash = await generateHash(secret);
      newSecretState = {
        ..._secretState,
        player1: { secret: secret.toString(), hash: hash.toString() },
      };
      secretInfo.set(newSecretState);
    } else if (_gameState == 2) {
      let secret = generateUserSecret();
      let hash = await generateHash(secret);
      newSecretState = {
        ..._secretState,
        player2: { secret: secret.toString(), hash: hash.toString() },
      };
      secretInfo.set(newSecretState);
    } else if (_gameState == 3) {
      let secret = generateUserSecret();
      let hash = await generateHash(secret);
      newSecretState = {
        ..._secretState,
        player3: { secret: secret.toString(), hash: hash.toString() },
      };
      secretInfo.set(newSecretState);
    } else if (_gameState == 4) {
      let secret = generateUserSecret();
      let hash = await generateHash(secret);
      newSecretState = {
        ..._secretState,
        player4: { secret: secret.toString(), hash: hash.toString() },
      };
      secretInfo.set(newSecretState);
    } else if (_gameState == 5) {
      let secret = generateUserSecret();
      let hash = await generateHash(secret);
      newSecretState = {
        ..._secretState,
        dealer: { secret: secret.toString(), hash: hash.toString() },
      };
      secretInfo.set(newSecretState);
    } else if (_gameState == 6) {
      console.log("INITIALIZE GAME");
      gameHash.set(ethers.utils.keccak256(ethers.utils.toUtf8Bytes("LOL")));
    } else if (_gameState == 7) {
      newHandState = {
        ..._handState,
        player1: { card1: newCard },
      };
    } else if (_gameState == 8) {
      newHandState = {
        ..._handState,
        player2: { card1: newCard },
      };
    } else if (_gameState == 9) {
      newHandState = {
        ..._handState,
        player3: { card1: newCard },
      };
    } else if (_gameState == 10) {
      newHandState = {
        ..._handState,
        player4: { card1: newCard },
      };
    } else if (_gameState == 11) {
      newHandState = {
        ..._handState,
        player1: { ..._handState.player1, card2: newCard },
      };
    } else if (_gameState == 12) {
      newHandState = {
        ..._handState,
        player2: { ..._handState.player2, card2: newCard },
      };
    } else if (_gameState == 13) {
      newHandState = {
        ..._handState,
        player3: { ..._handState.player3, card2: newCard },
      };
    } else if (_gameState == 14) {
      newHandState = {
        ..._handState,
        player4: { ..._handState.player4, card2: newCard },
      };
    } else if (_gameState == 15) {
      newHandState = {
        ..._handState,
        dealer: { card1: newCard },
      };
    } else if (_gameState == 16) {
      newHandState = {
        ..._handState,
        dealer: { ..._handState.dealer, card2: newCard },
      };
    } else if (_gameState == 17) {
      newHandState = {
        ..._handState,
        dealer: {
          ..._handState.dealer,
          card3: newCard,
        },
      };
    } else if (_gameState == 18) {
      newHandState = {
        ..._handState,
        dealer: {
          ..._handState.dealer,
          card4: newCard,
        },
      };
    } else if (_gameState == 19) {
      newHandState = {
        ..._handState,
        dealer: {
          ..._handState.dealer,
          card5: newCard,
        },
      };
    } else {
      newHandState = {} as HandInfo;
      let newDeck: Card[] = [];
      for (let item of defaultDeck) {
        newDeck.push(item);
      }
      currentDeck.update(() => newDeck);
    }
    if (newHandState) handInfo.set(newHandState);
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

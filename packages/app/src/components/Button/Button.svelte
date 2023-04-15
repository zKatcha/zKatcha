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
  import { PubInput, Random, RandomProver } from "@minamal/zk";

  import { Field, Poseidon, Proof, SelfProof, isReady } from "snarkyjs";
  import { BigNumber, ethers } from "ethers";

  let _maxGameStates: number;
  let _gameState: number;
  let _handState: HandInfo;
  let _secretState: SecretInfo;
  let _currentDeck: Card[];
  let _cardIndex: number;
  let _gameHash: string;
  let _currentRandom: number;
  let prover: RandomProver;

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

  gameHash.subscribe((value) => {
    _gameHash = value;
  });

  function generateUserSecret() {
    let random = Math.floor(Math.random() * 10000);
    return random;
  }

  async function generateHash(secret: number | Field) {
    prover = new RandomProver();
    await isReady;
    console.log(`Ready`);
    let secretField = new Field(secret);
    let hash = prover.poseidon([secretField]);
    console.log("🚀 | generateHash | hash:", hash);

    // convert hash to hexstring using ethers
    let hashHex = ethers.utils.hexlify(BigNumber.from(hash.toString()));
    console.log("🚀 | generateHash | hashHex:", hashHex);

    // let hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(secret.toString()));
    return hashHex;
  }

  function generateGameHash(
    player1Hash: string,
    player2Hash: string,
    player3Hash: string,
    player4Hash: string
  ) {
    let hash = Poseidon.hash([
      new Field(player1Hash),
      new Field(player2Hash),
      new Field(player3Hash),
      new Field(player4Hash),
    ]);
    let hashHex = ethers.utils.hexlify(BigNumber.from(hash.toString()));

    return hashHex;
  }

  function getPRandom() {
    return Math.floor(Math.random() * 100);
  }

  function getCard(): Card {
    // Generate Random Number
    let _randomNumber = getPRandom();
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

  function getCard2(seed: Field): Card {
    currentRandom.set(ethers.utils.hexlify(BigNumber.from(seed.toString())));
    _cardIndex = Number(seed) % _currentDeck.length;
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

      gameHash.set(
        generateGameHash(
          _secretState.player1.hash as string,
          _secretState.player2.hash as string,
          _secretState.player3.hash as string,
          _secretState.player4.hash as string
        ).toString()
      );
    } else if (_gameState == 7) {
      let random = prover.createRandom(
        new Field(_secretState.player1.secret as string),
        new Field(_gameHash),
        new Field(0)
      );
      let newCard = getCard2(random);
      newHandState = {
        ..._handState,
        player1: { card1: newCard },
      };

      // Generate Proof
      const pubIn = new PubInput({
        CombinedRandomness: new Field(_gameHash),
        Nonce: new Field(0),
        GenerateRandomOutput: random,
        UserHashedSecret: new Field(_secretState.player1.hash as string),
      });
    } else if (_gameState == 8) {
      let random = prover.createRandom(
        new Field(_secretState.player2.secret as string),
        new Field(_gameHash),
        new Field(0)
      );
      let newCard = getCard2(random);
      newHandState = {
        ..._handState,
        player2: { card1: newCard },
      };
    } else if (_gameState == 9) {
      let random = prover.createRandom(
        new Field(_secretState.player3.secret as string),
        new Field(_gameHash),
        new Field(0)
      );
      let newCard = getCard2(random);
      newHandState = {
        ..._handState,
        player3: { card1: newCard },
      };
    } else if (_gameState == 10) {
      let random = prover.createRandom(
        new Field(_secretState.player4.secret as string),
        new Field(_gameHash),
        new Field(0)
      );
      let newCard = getCard2(random);
      newHandState = {
        ..._handState,
        player4: { card1: newCard },
      };
    } else if (_gameState == 11) {
      let random = prover.createRandom(
        new Field(_secretState.player1.secret as string),
        new Field(_gameHash),
        new Field(0)
      );
      let newCard = getCard2(random);
      newHandState = {
        ..._handState,
        player1: { ..._handState.player1, card2: newCard },
      };
    } else if (_gameState == 12) {
      let random = prover.createRandom(
        new Field(_secretState.player2.secret as string),
        new Field(_gameHash),
        new Field(0)
      );
      let newCard = getCard2(random);
      newHandState = {
        ..._handState,
        player2: { ..._handState.player2, card2: newCard },
      };
    } else if (_gameState == 13) {
      let random = prover.createRandom(
        new Field(_secretState.player3.secret as string),
        new Field(_gameHash),
        new Field(0)
      );
      let newCard = getCard2(random);
      newHandState = {
        ..._handState,
        player3: { ..._handState.player3, card2: newCard },
      };
    } else if (_gameState == 14) {
      let random = prover.createRandom(
        new Field(_secretState.player4.secret as string),
        new Field(_gameHash),
        new Field(0)
      );
      let newCard = getCard2(random);
      newHandState = {
        ..._handState,
        player4: { ..._handState.player4, card2: newCard },
      };
    } else if (_gameState == 15) {
      let random = prover.createRandom(
        new Field(_secretState.dealer.secret as string),
        new Field(_gameHash),
        new Field(0)
      );
      let newCard = getCard2(random);
      newHandState = {
        ..._handState,
        dealer: { card1: newCard },
      };
    } else if (_gameState == 16) {
      let random = prover.createRandom(
        new Field(_secretState.dealer.secret as string),
        new Field(_gameHash),
        new Field(0)
      );
      let newCard = getCard2(random);
      newHandState = {
        ..._handState,
        dealer: { ..._handState.dealer, card2: newCard },
      };
    } else if (_gameState == 17) {
      let random = prover.createRandom(
        new Field(_secretState.dealer.secret as string),
        new Field(_gameHash),
        new Field(0)
      );
      let newCard = getCard2(random);
      newHandState = {
        ..._handState,
        dealer: {
          ..._handState.dealer,
          card3: newCard,
        },
      };
    } else if (_gameState == 18) {
      let random = prover.createRandom(
        new Field(_secretState.dealer.secret as string),
        new Field(_gameHash),
        new Field(0)
      );
      let newCard = getCard2(random);
      newHandState = {
        ..._handState,
        dealer: {
          ..._handState.dealer,
          card4: newCard,
        },
      };
    } else if (_gameState == 19) {
      let random = prover.createRandom(
        new Field(_secretState.dealer.secret as string),
        new Field(_gameHash),
        new Field(0)
      );
      let newCard = getCard2(random);
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

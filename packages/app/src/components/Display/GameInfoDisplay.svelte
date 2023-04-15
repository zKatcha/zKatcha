<script lang="ts">
  import type { LineInfo, SecretInfo } from "../../types";
  import GameInfoDisplay from "./GameInfoDisplay.svelte";
  import GameInfoLine from "./DisplayLine.svelte";
  import { cardIndex, currentDeck, currentRandom, gameState, secretInfo } from "../../stores";

  let _secretInfo: SecretInfo;
  let _gameState: string = "0";
  let _currentRandom: string = "0";
  let _cardsRemaining: string = "0";
  let _cardIndex: string = "0";

  secretInfo.subscribe((value) => {
    _secretInfo = value;
  });

  gameState.subscribe((value) => {
    _gameState = value.toString();
  });

  cardIndex.subscribe((value) => {
    _cardIndex = value.toString();
  });

  currentRandom.subscribe((value) => {
    _currentRandom = value.toString();
  });

  currentDeck.subscribe((value) => {
    _cardsRemaining = value.length.toString();
  });

  $: lines = [
    {
      name: "Turn",
      value: _gameState,
    },
    {
      name: "Game Secret",
      value: "888",
    },
    {
      name: "Current Random",
      value: _currentRandom,
    },
    {
      name: "Cards Remaining",
      value: _cardsRemaining,
    },
    {
      name: "Card Index",
      value: _cardIndex,
    },
  ];
</script>

<container>
  {#each lines as line}
    <GameInfoLine lineInfo={line} />
  {/each}
</container>

<style>
  container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
</style>

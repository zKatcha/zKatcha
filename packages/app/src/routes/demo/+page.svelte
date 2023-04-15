<script lang="ts">
  import Button from "../../components/Button/Button.svelte";
  import ResetButton from "../../components/Button/ResetButton.svelte";
  import Board from "../../components/Card/Board.svelte";
  import PlayerHand from "../../components/Card/PlayerHand.svelte";
  import GameInfoDisplay from "../../components/Display/GameInfoDisplay.svelte";
  import SecretsDisplay from "../../components/Display/SecretsDisplay.svelte";
  import HorizontalStack from "../../components/Stack/HorizontalStack.svelte";
  import VerticalStack from "../../components/Stack/VerticalStack.svelte";
  import { gameState } from "../../stores";

  let _gameState: number;

  let gameStateTitles = [
    "GENERATE PLAYER 1 SECRET",
    "GENERATE PLAYER 2 SECRET",
    "GENERATE PLAYER 3 SECRET",
    "GENERATE PLAYER 4 SECRET",
    "GENERATE PLAYER DEALER SECRET",
    "GENERATE GAME SECRET",
    "PRE-FLOP, PLAYER 1, CARD 1",
    "PRE-FLOP, PLAYER 2, CARD 1",
    "PRE-FLOP, PLAYER 3, CARD 1",
    "PRE-FLOP, PLAYER 4, CARD 1",
    "PRE-FLOP, PLAYER 1, CARD 2",
    "PRE-FLOP, PLAYER 2, CARD 2",
    "PRE-FLOP, PLAYER 3, CARD 2",
    "PRE-FLOP, PLAYER 4, CARD 2",
    "BOARD CARD 1",
    "BOARD CARD 2",
    "BOARD CARD 3",
    "BOARD CARD 4",
    "BOARD CARD 5",
    "END",
  ];
  let gameStateTitle: string;

  gameState.subscribe((value) => {
    _gameState = value;
    gameStateTitle = gameStateTitles[value];
  });
</script>

<section>
  <HorizontalStack>
    <VerticalStack>
      <SecretsDisplay />
      <GameInfoDisplay />
      <button-stack>
        <Button />
        <ResetButton />
      </button-stack>
    </VerticalStack>
    <VerticalStack>
      <title>{gameStateTitle}</title>
      <Board />
    </VerticalStack>
  </HorizontalStack>
</section>

<style>
  title {
    width: auto;
    height: 54px;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-size: 2rem;
    line-height: 54px;
    /* identical to box height */

    display: flex;
    align-items: center;

    color: #000000;
  }

  button-stack {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 4px;
  }
</style>

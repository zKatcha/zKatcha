<script>
  import RequestButton from "../../components/Button/Button.svelte";
  import PlayerHand from "../../components/Card/PlayerHand.svelte";
  import GameInfoDisplay from "../../components/Display/GameInfoDisplay.svelte";
  import SecretsDisplay from "../../components/Display/SecretsDisplay.svelte";
  import HorizontalStack from "../../components/Stack/HorizontalStack.svelte";
  import VerticalStack from "../../components/Stack/VerticalStack.svelte";

  let gameStateTitle = "PRE-FLOP, PLAYER 1, CARD 1";
</script>

<section>
  <HorizontalStack>
    <VerticalStack>
      <SecretsDisplay />
      <GameInfoDisplay />
      <RequestButton />
    </VerticalStack>
    <VerticalStack>
      <title>{gameStateTitle}</title>
      <PlayerHand />
      <div>Cards Display</div>
    </VerticalStack>
  </HorizontalStack>
</section>

<style>
  title {
    width: 490px;
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
</style>

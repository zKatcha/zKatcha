<script lang="ts">
  import DealerBoard from "./DealerBoard.svelte";
  import PlayerHand from "./PlayerHand.svelte";

  import { handInfo } from "../../stores";
  import type { HandInfo } from "../../types";
  let _handInfo: HandInfo;

  handInfo.subscribe((value) => {
    _handInfo = value;
  });
</script>

<board>
  <player-hands>
    <PlayerHand
      card1={_handInfo.player1?.card1 || { suit: "", value: "" }}
      card2={_handInfo.player1?.card2 || { suit: "", value: "" }}
      playerName={"Player 1"}
    />
    <PlayerHand
      card1={_handInfo.player2?.card1 || { suit: "", value: "" }}
      card2={_handInfo.player2?.card2 || { suit: "", value: "" }}
      playerName={"Player 2"}
    />
    <PlayerHand
      card1={_handInfo.player3?.card1 || { suit: "", value: "" }}
      card2={_handInfo.player3?.card2 || { suit: "", value: "" }}
      playerName={"Player 3"}
    />
    <PlayerHand
      card1={_handInfo.player4?.card1 || { suit: "", value: "" }}
      card2={_handInfo.player4?.card2 || { suit: "", value: "" }}
      playerName={"Player 4"}
    />
  </player-hands>
  <DealerBoard
    card1={_handInfo.dealer?.card1 || { suit: "", value: "" }}
    card2={_handInfo.dealer?.card2 || { suit: "", value: "" }}
    card3={_handInfo.dealer?.card3 || { suit: "", value: "" }}
    card4={_handInfo.dealer?.card4 || { suit: "", value: "" }}
    card5={_handInfo.dealer?.card5 || { suit: "", value: "" }}
  />
</board>

<style>
  board {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }

  player-hands {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }
</style>

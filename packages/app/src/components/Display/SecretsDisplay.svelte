<script lang="ts">
  import type { LineInfo, SecretInfo } from "../../types";
  import GameInfoDisplay from "./GameInfoDisplay.svelte";
  import GameInfoLine from "./DisplayLine.svelte";
  import { secretInfo } from "../../stores";

  export let amount: string = "0";

  let _secretInfo: SecretInfo;

  secretInfo.subscribe((value) => {
    _secretInfo = value;
  });

  $: lines = [
    {
      name: "Player 1 Secret",
      value: _secretInfo.player1?.secret || "-",
    },
    {
      name: "Hash(Player 1 Secret)",
      value: _secretInfo.player1?.hash || "-",
    },
    {
      name: "Player 2 Secret",
      value: _secretInfo.player2.secret || "-",
    },
    {
      name: "Hash(Player 2 Secret)",
      value: _secretInfo.player2.hash || "-",
    },
    {
      name: "Player 3 Secret",
      value: _secretInfo.player3.secret || "-",
    },
    {
      name: "Hash(Player 3 Secret)",
      value: _secretInfo.player3.hash || "-",
    },
    {
      name: "Player 4 Secret",
      value: _secretInfo.player4.secret || "-",
    },
    {
      name: "Hash(Player 4 Secret)",
      value: _secretInfo.player4.hash || "-",
    },
    {
      name: "Dealer Secret",
      value: _secretInfo.dealer.secret || "-",
    },
    {
      name: "Hash(Dealer Secret)",
      value: _secretInfo.dealer.hash || "-",
    },
  ];

  // your script goes here
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
    /* gap: 24px; */
    width: 100%;
    /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); */
  }
</style>

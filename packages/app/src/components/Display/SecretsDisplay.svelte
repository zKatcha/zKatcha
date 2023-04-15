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

  let lines: LineInfo[] = [
    {
      name: "Player 1 Secret",
      value: "0000000000000000000000",
    },
    {
      name: "Hash(Player 1 Secret)",
      value: "0x00000",
    },
    {
      name: "Player 2 Secret",
      value: "0",
    },
    {
      name: "Hash(Player 2 Secret)",
      value: "0x00000",
    },
    {
      name: "Player 3 Secret",
      value: "0",
    },
    {
      name: "Hash(Player 3 Secret)",
      value: "0x00000",
    },
    {
      name: "Player 4 Secret",
      value: "0",
    },
    {
      name: "Hash(Player 4 Secret)",
      value: "0x00000",
    },
    {
      name: "Dealer Secret",
      value: "0",
    },
    {
      name: "Hash(Dealer Secret)",
      value: "0x00000",
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

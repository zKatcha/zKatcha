<script lang="ts">
  import type { LineInfo, SecretInfo } from "../../types";
  import GameInfoDisplay from "./GameInfoDisplay.svelte";
  import GameInfoLine from "./DisplayLine.svelte";
  import { secretInfo } from "../../stores";

  let _secretInfo: SecretInfo;

  secretInfo.subscribe((value) => {
    _secretInfo = value;
  });

  let lines: LineInfo[] = [
    {
      name: "Turn",
      value: "0",
    },
    {
      name: "Game Secret",
      value: "888",
    },
    {
      name: "Current Random",
      value: "1234",
    },
    {
      name: "Cards Remaining",
      value: "52",
    },
    {
      name: "Card Index",
      value: "2",
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

<script lang="ts">
  import { RandomProver } from "@minamal/zk";

  async function handleClick() {
    console.log("Verify");
    let prover = new RandomProver();
    console.log("generating proof");
    await prover.setup();
    console.log("setup");
    prover.ensureSetup();
  }
</script>

<button on:click={handleClick}>
  <button-text>Verify</button-text>
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
    justify-items: center;
    align-items: center;
    padding: 10px 16px;
    gap: 8px;

    width: 100px;
    height: 40px;

    background: #000000;
    border-radius: 10px;

    /* Inside auto layout */
  }
  button-text {
    /* NEXT */

    width: auto;
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
  }
</style>

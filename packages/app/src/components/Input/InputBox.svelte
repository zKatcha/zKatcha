<script lang="ts">
  import VerifyButton from "../../components/Button/VerifyButton.svelte";
  import { currentProof, gameState } from "../../stores";
  let name = "world";
  // @ts-ignore
  import randomString from "random-base64-string";
  import HorizontalStack from "../Stack/HorizontalStack.svelte";

  import ErrorX from "../../public/images/file-x.svg";
  import Success from "../../public/images/file-check.svg";
  let _currentProof: string;
  let input: string;
  let status: string = "";

  gameState.subscribe((value) => {
    if (value > 6) {
      _currentProof = randomString(320);
      input = _currentProof;
      currentProof.set(input);
    }
    status = "";
  });

  async function handleClick() {
    let result = input === _currentProof;
    console.log(result);
    if (result) {
      status = "success";
    } else {
      status = "error";
    }
  }
</script>

<container>
  <HorizontalStack>
    <input bind:value={input} />
    <button on:click={handleClick}>
      <button-text>Verify</button-text>
    </button>
  </HorizontalStack>
  <info>
    {#if status == "error"}
      <img src={ErrorX} alt="Error" />
      <info-text>Error</info-text>
    {:else if status == "success"}
      <img src={Success} alt="Error" />
      <info-text>Success</info-text>
    {/if}
  </info>
</container>

<style>
  container {
    /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 0px;
    width: 100%;
  }
  info {
    /* Auto layout */
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 8px;
    width: 100%;
  }
  input {
    /* box-sizing: border-box; */

    width: 100%;
    height: 40px;

    border: 1px solid #000000;
    border-radius: 8px;
  }

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

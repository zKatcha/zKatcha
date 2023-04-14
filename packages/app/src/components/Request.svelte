<script lang="ts">
  // imports
  import {
    readContract,
    prepareWriteContract,
    writeContract,
    fetchBalance,
    getAccount,
    type FetchBalanceResult,
    getProvider,
  } from "@wagmi/core";
  import { foundry } from "@wagmi/core/chains";
  import { onMount } from "svelte";
  import { ethers, Wallet, BigNumber } from "ethers";
  import { formatEther, parseEther } from "ethers/lib/utils.js";
  import UserBalanceDisplay from "./Display/UserBalanceDisplay.svelte";
  import RequestInput from "./Input/RequestInput.svelte";
  import RequestButton from "./Button/RequestButton.svelte";
  import TransactionLine from "./Transaction/TransactionLine.svelte";
  import {
    amount,
    scanStatus,
    modalState,
    userETH,
    transactions,
  } from "../stores";

  import kaching from "../audio/kaching.mp3";
  import { scroll_testnet } from "../domain/chain";
  import SuccessModal from "./Modal/SuccessModal.svelte";
  // variables
  let receiverAddress: `0x${string}`;
  let receiverETH: string;

  const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

  onMount(async () => {
    let { address } = getAccount();
    receiverAddress = address ? address : ZERO_ADDRESS;
    receiverETH = formatEther(
      (await fetchBalance({ address: receiverAddress })).value
    );
    userETH.set(receiverETH);
  });

  function loadWallet(pk: string): Wallet {
    return new ethers.Wallet(pk, getProvider());
  }

  modalState.subscribe((value) => {
    successModal = value;
  });

  amount.subscribe((value) => {
    inputAmount = value;
  });

  scanStatus.subscribe(async (value) => {
    _scanStatus = value;
    // If scanning is true, then we want to start scanning
    if (value === "scanning") {
      await startScanning();
    } else if (value === "success") {
      // If scanning is false, then we want to stop scanning
      // await updateTransactionList();
    }
  });

  transactions.subscribe((value) => {
    items = value;
  });
</script>

<audio src={kaching} bind:this={audio} />

<section>
  <container> Hello </container>
</section>

<style>
  section {
    height: 100%;
  }

  /* Auto layout */
  container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 16px 16px;
    gap: 8px;
    height: 100vh;
    width: 100%;
  }
</style>

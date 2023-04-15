import type { GameInfo, SecretInfo } from "./types";

// import type { Client } from "@wagmi/core";
// import type { EthereumClient } from "@web3modal/ethereum";
// import type { Web3Modal } from "@web3modal/html";
import { writable } from "svelte/store";

// export const ethereumClient = writable<EthereumClient>();
// export const wagmiClient = writable<Client>();
// export const web3Modal = writable<Web3Modal>();
// export const providers = writable<{ [chainId: number]: ethers.providers.JsonRpcProvider }>();

export const currentTab = writable("home");
export const modalState = writable(true);

export const gameInfo = writable<GameInfo>();
export const secretInfo = writable<SecretInfo>();

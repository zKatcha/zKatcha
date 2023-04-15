import type { Card, GameInfo, HandInfo, SecretInfo } from "./types";
// import type { Client } from "@wagmi/core";
// import type { EthereumClient } from "@web3modal/ethereum";
// import type { Web3Modal } from "@web3modal/html";
import { readable, writable } from "svelte/store";
import { RandomProver, RandomVerifier} from "@minamal/zk"

// export const ethereumClient = writable<EthereumClient>();
// export const wagmiClient = writable<Client>();
// export const web3Modal = writable<Web3Modal>();
// export const providers = writable<{ [chainId: number]: ethers.providers.JsonRpcProvider }>();

export const defaultDeck: Card[] = [
  { suit: "D", value: "A" },
  { suit: "D", value: "2" },
  { suit: "D", value: "3" },
  { suit: "D", value: "4" },
  { suit: "D", value: "5" },
  { suit: "D", value: "6" },
  { suit: "D", value: "7" },
  { suit: "D", value: "8" },
  { suit: "D", value: "9" },
  { suit: "D", value: "10" },
  { suit: "D", value: "J" },
  { suit: "D", value: "Q" },
  { suit: "D", value: "K" },
  { suit: "C", value: "A" },
  { suit: "C", value: "2" },
  { suit: "C", value: "3" },
  { suit: "C", value: "4" },
  { suit: "C", value: "5" },
  { suit: "C", value: "6" },
  { suit: "C", value: "7" },
  { suit: "C", value: "8" },
  { suit: "C", value: "9" },
  { suit: "C", value: "10" },
  { suit: "C", value: "J" },
  { suit: "C", value: "Q" },
  { suit: "C", value: "K" },
  { suit: "H", value: "A" },
  { suit: "H", value: "2" },
  { suit: "H", value: "3" },
  { suit: "H", value: "4" },
  { suit: "H", value: "5" },
  { suit: "H", value: "6" },
  { suit: "H", value: "7" },
  { suit: "H", value: "8" },
  { suit: "H", value: "9" },
  { suit: "H", value: "10" },
  { suit: "H", value: "J" },
  { suit: "H", value: "Q" },
  { suit: "H", value: "K" },
  { suit: "S", value: "A" },
  { suit: "S", value: "2" },
  { suit: "S", value: "3" },
  { suit: "S", value: "4" },
  { suit: "S", value: "5" },
  { suit: "S", value: "6" },
  { suit: "S", value: "7" },
  { suit: "S", value: "8" },
  { suit: "S", value: "9" },
  { suit: "S", value: "10" },
  { suit: "S", value: "J" },
  { suit: "S", value: "Q" },
  { suit: "S", value: "K" },
];

export const currentTab = writable("home");
export const modalState = writable(true);
export const gameState = writable(0);
export const maxGameStates = readable(13);

export const currentRandom = writable<number>(0);
export const currentDeck = writable<Card[]>(defaultDeck);
export const cardIndex = writable<number>(0);

export const gameInfo = writable<GameInfo>();
export const secretInfo = writable<SecretInfo>({
  player1: {},
  player2: {},
  player3: {},
  player4: {},
  dealer: {},
});
export const handInfo = writable<HandInfo>({
  player1: {},
  player2: {},
  player3: {},
  player4: {},
  dealer: {},
});

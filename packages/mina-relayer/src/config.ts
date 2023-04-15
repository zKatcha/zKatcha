export const config: Record<string, Record<string, string>> = {
  goerli: {
    url: "https://rpc.ankr.com/eth_goerli",
    callbackContractAddr: "0x3763Dcd5d1463010e9eF873ef60e44B09a534b8C",
  },
  mantle_testnet: {
    url: 'https://rpc.testnet.mantle.xyz',
    callbackContractAddr: "0xb9AC1b6c032A451Bf405bD8b25C8cf8C9ebf9D39",
  },
  taiko_testnet: {
    url: 'https://rpc.a2.taiko.xyz',
    callbackContractAddr: "0xb9AC1b6c032A451Bf405bD8b25C8cf8C9ebf9D39",
  },
  gnosis_testnet: {
    url: 'https://rpc.chiadochain.net',
    callbackContractAddr: "0xb9AC1b6c032A451Bf405bD8b25C8cf8C9ebf9D39",
  },
  alfajore: {
    url: 'https://alfajores-forno.celo-testnet.org',
    callbackContractAddr: "0xb9AC1b6c032A451Bf405bD8b25C8cf8C9ebf9D39",
  },
  scroll_testnet: {
    url: 'https://alpha-rpc.scroll.io/l2',
    callbackContractAddr: "0xb9AC1b6c032A451Bf405bD8b25C8cf8C9ebf9D39",
  },
  mumbai: {
    url: 'https://matic-mumbai.chainstacklabs.com',
    callbackContractAddr: "0x9bFd535DbA6F1387526622f9E8fEfF6808AC1Aa6",
  },
};

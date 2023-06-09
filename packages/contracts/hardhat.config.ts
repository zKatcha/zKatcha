import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

import '@nomiclabs/hardhat-ethers';
import 'hardhat-deploy';
import 'dotenv/config';

import { ethers } from 'ethers';
import ethers from 'ethers';
import { task } from 'hardhat/config';
import { HardhatConfig, HttpNetworkHDAccountsConfig } from 'hardhat/types';

task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task('new:wallet', 'Generate New Wallet', async (taskArgs, hre) => {
  const wallet = hre.ethers.Wallet.createRandom();
  console.log('PK: ', wallet._signingKey().privateKey);
  console.log('Address: ', wallet.address);
});

let ACCOUNT;
let useMnemonic = true;

// Setup Default Values
let PRIVATE_KEY;
if (process.env.PRIVATE_KEY) {
  PRIVATE_KEY = process.env.PRIVATE_KEY;
} else {
  console.log('⚠️ Please set PRIVATE_KEY in the .env file');
  PRIVATE_KEY = ethers.Wallet.createRandom()._signingKey().privateKey;
}

let PRIVATE_KEY_TESTNET;
if (process.env.PRIVATE_KEY_TESTNET) {
  PRIVATE_KEY_TESTNET = process.env.PRIVATE_KEY_TESTNET;
} else {
  console.log('⚠️ Please set PRIVATE_KEY_TESTNET in the .env file');
  PRIVATE_KEY_TESTNET = ethers.Wallet.createRandom()._signingKey().privateKey;
}

if (!process.env.INFURA_API_KEY) {
  console.log('⚠️ Please set INFURA_API_KEY in the .env file');
}

if (!process.env.ETHERSCAN_API_KEY) {
  console.log('⚠️ Please set ETHERSCAN_API_KEY in the .env file');
}

if (useMnemonic) {
  ACCOUNT = {
    mnemonic: process.env.MNEMONIC,
  };
} else {
  ACCOUNT = [`0x${PRIVATE_KEY}`];
}

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks: {
    localhost: {
      url: 'http://0.0.0.0:8545',
      saveDeployments: true,
      accounts: [PRIVATE_KEY],
    },
    hardhat: {
      // TODO: Add snapshot block
      // forking: {
      //   url: process.env.ALCHEMY_PROVIDER_MAINNET,
      //   block: 0,
      // },
      blockGasLimit: 10000000000,
      mining: {
        auto: true,
      },
      accounts: ACCOUNT,
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      chainId: 1,
      accounts: [PRIVATE_KEY],
      saveDeployments: true,
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
      chainId: 4,
      accounts: [PRIVATE_KEY],
      saveDeployments: true,
    },
    goerli: {
      url: `https://rpc.ankr.com/eth_goerli`,
      chainId: 5,
      accounts: [PRIVATE_KEY],
      saveDeployments: true,
    },
    matic: {
      url: 'https://polygon-rpc.com',
      chainId: 137,
      accounts: [PRIVATE_KEY],
    },
    mumbai: {
      url: 'https://matic-mumbai.chainstacklabs.com',
      chainId: 80001,
      accounts: [PRIVATE_KEY],
      saveDeployments: true,
    },
    optimism_mainnet: {
      url: 'https://mainnet.optimism.io',
      chainId: 10,
      accounts: [PRIVATE_KEY],
      saveDeployments: true,
    },
    optimism_testnet: {
      url: 'https://goerli.optimism.io',
      chainId: 420,
      accounts: [PRIVATE_KEY],
      saveDeployments: true,
    },
    arbitrum_mainnet: {
      url: 'https://arb1.arbitrum.io/rpc',
      chainId: 42161,
      accounts: [PRIVATE_KEY],
      saveDeployments: true,
    },
    arbitrum_testnet: {
      url: 'https://rinkeby.arbitrum.io/rpc',
      chainId: 421611,
      accounts: [PRIVATE_KEY],
      saveDeployments: true,
    },
    cronos_testnet: {
      url: `https://evm-t3.cronos.org`,
      chainId: 338,
      accounts: [PRIVATE_KEY],
    },
    cronos_mainnet: {
      url: `https://mainnet.cronoslabs.com/v1/55e37d8975113ae7a44603ef8ce460aa/`,
      chainId: 25,
      accounts: [PRIVATE_KEY],
      gasLimit: 1000000000000,
    },
    scroll_testnet: {
      url: 'https://alpha-rpc.scroll.io/l2',
      chainId: 534353,
      accounts: [PRIVATE_KEY],
      saveDeployments: true,
    },
    metis_testnet: {
      url: 'https://goerli.gateway.metisdevops.link',
      chainId: 599,
      accounts: [PRIVATE_KEY],
      saveDeployments: true,
    },
    base_testnet: {
      url: 'https://goerli.base.org',
      chainId: 84531,
      accounts: [PRIVATE_KEY],
      saveDeployments: true,
    },
    mantle_testnet: {
      url: 'https://rpc.testnet.mantle.xyz',
      chainId: 5001,
      accounts: [PRIVATE_KEY],
      saveDeployments: true,
    },
    taiko_testnet: {
      url: 'https://rpc.a2.taiko.xyz',
      chainId: 167004,
      accounts: [PRIVATE_KEY],
      saveDeployments: true,
    },
    gnosis: {
      url: 'https://rpc.gnosischain.com/',
      chainId: 100,
      accounts: [PRIVATE_KEY],
      saveDeployments: true,
      gasPrice: 3000000000,
    },
    gnosis_testnet: {
      url: 'https://rpc.chiadochain.net',
      chainId: 10200,
      accounts: [PRIVATE_KEY],
      saveDeployments: true,
    },
    alfajore: {
      url: 'https://alfajores-forno.celo-testnet.org',
      chainId: 44787,
      accounts: [PRIVATE_KEY],
      saveDeployments: true,
    },
  },
  solidity: '0.8.17',
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
    },
    treasury: {
      default: 1, // here this will by default take the second account as treasury
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
    deploy: './deploy',
    subgraph: './subgraph', // Defaults to './subgraph'
  },
  mocha: {
    timeout: 2000000000,
  },
  typechain: {
    outDir: 'typechain',
    target: 'ethers-v5',
  },
  gasReporter: {
    enabled: true,
    gasPrice: 100,
  },
  verify: {
    etherscan: {
      apiKey: process.env.ETHERSCAN_API_KEY,
    },
  },
};

export default config;

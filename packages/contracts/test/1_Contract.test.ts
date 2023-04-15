import 'dotenv/config';

import { BigNumber, BigNumberish, Contract } from 'ethers';
import { deployments, ethers } from 'hardhat';

import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

let owner: SignerWithAddress;
let user1: SignerWithAddress;
let contract: EvmProofChannel;


async function getContract(contractName: string) {
  return await ethers.getContractAt(contractName, (await deployments.get(contractName)).address);
}

describe('EvmProofChannel', function () {
  beforeEach(async function () {
    // Get Signers
    [owner, user1] = await ethers.getSigners();

    // Deploy Contracts
    await deployments.fixture(['EvmProofChannel']);

    // Get Contracts
    contract = (await getContract('EvmProofChannel')) as EvmProofChannel;
  });
});

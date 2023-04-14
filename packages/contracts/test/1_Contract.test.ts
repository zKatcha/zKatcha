import 'dotenv/config';

import { BigNumber, BigNumberish } from 'ethers';
import { deployments, ethers } from 'hardhat';

import { EntryPoint } from '../typechain/Contract';

let owner: SignerWithAddress;
let user1: SignerWithAddress;
let contract: Contract;


async function getContract(contractName: string) {
  return await ethers.getContractAt(contractName, (await deployments.get(contractName)).address);
}

describe('Contract', function () {
  beforeEach(async function () {
    // Get Signers
    [owner, user1] = await ethers.getSigners();

    // Deploy Contracts
    await deployments.fixture(['Contract']);

    // Get Contracts
    contract = (await getContract('Contract')) as Contract;
  });
});

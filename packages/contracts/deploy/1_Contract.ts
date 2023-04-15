import 'dotenv/config';

module.exports = async ({ getNamedAccounts, deployments, getChainId }: any) => {
  const { deploy, read, execute } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  let channelContract = await deploy('EvmProofChannel', {
    from: deployer,
    log: true,
    args: [],
  });

  let relayerContract = await deploy('UniversalRelayer', {
    from: deployer,
    log: true,
    args: [],
  });
};

module.exports.tags = ['EvmProofChannel', 'UniversalRelayer'];

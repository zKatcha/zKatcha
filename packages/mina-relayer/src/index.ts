import dotenv from "dotenv";
import express from "express";
import { ethers } from "ethers";
import morgan from "morgan";
import { isReady, shutdown } from "snarkyjs";
import { NFTStorage, Blob } from "nft.storage";
import { config } from "./config.js";
import relayerABI from "./Relayer.json" assert { type: "json" };
import { RandomVerifier } from "./RandomLib.js";
import { Random } from "./Random.js";

dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const NFT_STORAGE_API_KEY = process.env.NFT_STORAGE_API_KEY || "";

const main = async () => {
  console.log("Starting server...");
  const app = express();

  app.use(express.json());
  app.use(morgan("dev"));

  const nftStorage = new NFTStorage({ token: NFT_STORAGE_API_KEY });

  await isReady;
  const { verificationKey } = await Random.compile();
  const verifier = new RandomVerifier(verificationKey);

  app.post("/verify", async (req, res) => {
    const { id, publisher, proof, callbackContractAddr, network } = req.body;

    if (!proof) {
      return res.status(400).json({ error: "Missing proof" });
    }

    const selectedNetworkUrl = config[network || "goerli"]["url"];
    const actualCallbackContractAddr = ethers.isAddress(callbackContractAddr)
      ? callbackContractAddr
      : config["goerli"]["callbackContractAddr"];

    const result = await verifier.verifyProof(proof);

    const provider = new ethers.JsonRpcProvider(selectedNetworkUrl);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const contract = new ethers.Contract(
      actualCallbackContractAddr,
      relayerABI,
      wallet
    );

    // Upload proof to NFT storage
    const proofBlob = new Blob([JSON.stringify(proof)], { encoding: "utf-8" });
    const proofCid = await nftStorage.storeBlob(proofBlob);
    console.log("Proof CID: ", proofCid);

    // Push result to callback contract
    const submissionTx = await contract.publishProofVerification(
      id,
      publisher,
      proofCid,
      Date.now(),
      result
    );
    const receipt = await submissionTx.wait();

    return res.status(200).json(receipt);
  });

  return app.listen(5050, () => {
    console.log("Listening on port 5050");
    process.on("SIGINT", cleanupSnarkJS);
    process.on("SIGTERM", cleanupSnarkJS);
  });
};

const cleanupSnarkJS = async () => {
  console.log("Cleaning up snarkjs");
  await shutdown();
  process.exit();
};

main().catch(console.error);

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/access/Ownable.sol";


struct ZkVTRFProofVerificationResult {
    // The address of the publisher of the proof
    address publisher;
    // IPFS hash hosting the proof, gameHash, previousRandom, finalRandom and userHashedSecret
    string proofIPFSHash;
    uint256 timestamp;
    bool isValid;
}

/**
  * This contract is meant to be used by the relayer to publish the zkVTRF proof verification result.
  * Any contracts that wants to verify the zkVTRF proof using the relayer can use this contract to get the proof verification result.
  */
contract Relayer {
    mapping(string => ZkVTRFProofVerificationResult) public verificationResultMapping;

    event VerificationResultPublished(string id, string ipfsHash, bool isValid);

    function getZkVTRFProofVerificationResult(string calldata id) external view returns (ZkVTRFProofVerificationResult memory entry) {
        return verificationResultMapping[id];
    }

    /**
     * This function will be called by the relayer.
     * As such, when extending this contract, it is recommended to restrict access to this function to only allow the relayer to call it.
     */
    function publishProofVerification(string calldata id, address publisher, string calldata proofIPFSHash, uint256 timestamp, bool isValid) external {
        this._publishProofVerification(id, publisher, proofIPFSHash, timestamp, isValid);
    }

    function _publishProofVerification(string calldata id, address publisher, string calldata proofIPFSHash, uint256 timestamp, bool isValid) external {
        verificationResultMapping[id] = ZkVTRFProofVerificationResult(publisher, proofIPFSHash, timestamp, isValid);
        emit VerificationResultPublished(id, proofIPFSHash, isValid);
    }
}

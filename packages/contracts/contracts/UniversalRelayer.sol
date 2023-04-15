// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Relayer.sol";

contract UniversalRelayer is Relayer, Ownable {
    function publishProofVerification(string calldata id, address publisher, string calldata proofIPFSHash, uint256 timestamp, bool isValid) external override onlyOwner {
        this._publishProofVerification(id, publisher, proofIPFSHash, timestamp, isValid);
    }
}

// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";

struct ChannelSession {
    // The addresses of the participants
    address[] participants;
    // IPFS hash hosting the proof, gameHash, previousRandom, finalRandom and userHashedSecret
    string[] proofIPFSHashes;
    // Submission state;
    bool[] submitted;
}

/**
 * This contract is meant to be used by participants that uses the library for random number generation, and is essentially a
 * store of all final proof state of every user in each session.
 * It acts as a channel for the participants to submit their final zkVTRF proof, which should then be validated by a verifier.
 * If everyone is honest, the submitted proof and the final rand number should be valid and exactly similar.
 * The verifier can be a smart contract on MINA, a relayer or even the participants themself.
 *
 */
contract EvmProofChannel {
    // The key of the mapping is the session id, which can be any arbritrary unique string
    mapping(string => ChannelSession) private channelSessionMapping;

    event ProofSubmitted(string sessionId, address participant);
    event ProofSubmissionComplete(string sessionId);

    function createSession(string calldata sessionId, address[] calldata participants) external {
        require(channelSessionMapping[sessionId].participants.length == 0, "Session already exists");
        channelSessionMapping[sessionId] = ChannelSession(
            participants,
            new string[](participants.length),
            new bool[](participants.length)
        );
    }

    function submitProofToChannel(string calldata sessionId, string calldata proofIPFSHash) external {
        ChannelSession storage channelSession = channelSessionMapping[sessionId];
        address currentParticipant = address(0);
        uint currentParticipantIdx = 0;
        for (uint i = 0; i < channelSession.participants.length; i++) {
            if (channelSession.participants[i] == msg.sender) {
                currentParticipant = channelSession.participants[i];
                currentParticipantIdx = i;
                require(!channelSession.submitted[i], "Proof already submitted");
            }
        }

        require(currentParticipant != address(0), "Participant not found in session");

        channelSession.proofIPFSHashes[currentParticipantIdx] = proofIPFSHash;
        channelSession.submitted[currentParticipantIdx] = true;
        emit ProofSubmitted(sessionId, msg.sender);

        bool allSubmitted = true;
        for (uint i = 0; i < channelSession.submitted.length; i++) {
            if (!channelSession.submitted[i]) {
                allSubmitted = false;
                break;
            }
        }
        if (allSubmitted) {
            emit ProofSubmissionComplete(sessionId);
        }
    }

    function getChannelSession(string calldata sessionId) external view returns (ChannelSession memory session) {
        return channelSessionMapping[sessionId];
    }
}

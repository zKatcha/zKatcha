import { Poseidon, shutdown, verify } from 'snarkyjs';
import { Random } from './Random.js';
export class RandomProver {
    constructor() {
        this.setup = async () => {
            if (this.verificationKey) {
                return;
            }
            const { verificationKey } = await Random.compile();
            this.verificationKey = verificationKey;
        };
        this.ensureSetup = () => {
            if (!this.verificationKey) {
                throw Error('not setup');
            }
        };
        this.poseidon = (fields) => {
            const hashed = Poseidon.hash(fields);
            return hashed;
        };
        this.createRandom = (indvSecret, gameHash, nonce) => {
            const random = Poseidon.hash([indvSecret, gameHash, nonce]);
            return random;
        };
        this.proofFirst = async (pubIn, indivSecretField) => {
            const proof = await Random.generateFirst(pubIn, indivSecretField);
            return proof;
        };
        this.proofSubsequent = async (pubIn, indivSecretField, prevProof) => {
            const proof = await Random.generateSubsequent(pubIn, prevProof, indivSecretField);
            return proof;
        };
        this.kill = async () => {
            await shutdown();
        };
    }
}
export class RandomVerifier {
    constructor(verifierString) {
        this.verifyProof = async (proof) => {
            const ok = await verify(proof, this.verifierString);
            return ok;
        };
        this.verifierString = verifierString;
    }
}
//# sourceMappingURL=RandomLib.js.map
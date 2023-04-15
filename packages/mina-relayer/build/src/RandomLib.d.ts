import { Field, Proof, SelfProof } from 'snarkyjs';
import { PubInput } from './Random.js';
export declare class RandomProver {
    verificationKey: string | undefined;
    setup: () => Promise<void>;
    ensureSetup: () => void;
    poseidon: (fields: Field[]) => Field;
    createRandom: (indvSecret: Field, gameHash: Field, nonce: Field) => Field;
    proofFirst: (pubIn: PubInput, indivSecretField: Field) => Promise<Proof<PubInput>>;
    proofSubsequent: (pubIn: PubInput, indivSecretField: Field, prevProof: SelfProof<PubInput>) => Promise<Proof<PubInput>>;
    kill: () => Promise<void>;
}
export declare class RandomVerifier {
    readonly verifierString: string;
    constructor(verifierString: string);
    verifyProof: (proof: Proof<PubInput>) => Promise<boolean>;
}

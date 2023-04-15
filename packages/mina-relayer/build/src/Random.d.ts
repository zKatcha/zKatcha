import { Field, SelfProof, SmartContract, State } from "snarkyjs";
declare const PubInput_base: (new (value: {
    CombinedRandomness: Field;
    Nonce: Field;
    GenerateRandomOutput: Field;
    UserHashedSecret: Field;
}) => {
    CombinedRandomness: Field;
    Nonce: Field;
    GenerateRandomOutput: Field;
    UserHashedSecret: Field;
}) & {
    _isStruct: true;
} & import("snarkyjs/dist/node/snarky").ProvablePure<{
    CombinedRandomness: Field;
    Nonce: Field;
    GenerateRandomOutput: Field;
    UserHashedSecret: Field;
}> & {
    toInput: (x: {
        CombinedRandomness: Field;
        Nonce: Field;
        GenerateRandomOutput: Field;
        UserHashedSecret: Field;
    }) => {
        fields?: Field[] | undefined;
        packed?: [Field, number][] | undefined;
    };
    toJSON: (x: {
        CombinedRandomness: Field;
        Nonce: Field;
        GenerateRandomOutput: Field;
        UserHashedSecret: Field;
    }) => {
        CombinedRandomness: string;
        Nonce: string;
        GenerateRandomOutput: string;
        UserHashedSecret: string;
    };
    fromJSON: (x: {
        CombinedRandomness: string;
        Nonce: string;
        GenerateRandomOutput: string;
        UserHashedSecret: string;
    }) => {
        CombinedRandomness: Field;
        Nonce: Field;
        GenerateRandomOutput: Field;
        UserHashedSecret: Field;
    };
};
export declare class PubInput extends PubInput_base {
}
export declare const Random: {
    name: string;
    compile: () => Promise<{
        verificationKey: string;
    }>;
    verify: (proof: import("snarkyjs/dist/node/lib/proof_system").Proof<PubInput>) => Promise<boolean>;
    digest: () => string;
    analyzeMethods: () => {
        rows: number;
        digest: string;
        result: unknown;
        gates: import("snarkyjs/dist/node/snarky").Gate[];
        publicInputSize: number;
    }[];
    publicInputType: typeof PubInput;
} & {
    generateFirst: import("snarkyjs/dist/node/lib/proof_system").Prover<PubInput, [typeof Field]>;
    generateSubsequent: import("snarkyjs/dist/node/lib/proof_system").Prover<PubInput, [typeof SelfProof, typeof Field]>;
};
export declare let RandomProof_: {
    new ({ proof, publicInput, maxProofsVerified, }: {
        proof: unknown;
        publicInput: PubInput;
        maxProofsVerified: 0 | 1 | 2;
    }): {
        publicInput: PubInput;
        proof: unknown;
        maxProofsVerified: 0 | 1 | 2;
        shouldVerify: import("snarkyjs/dist/node/snarky").Bool;
        verify(): void;
        verifyIf(condition: import("snarkyjs/dist/node/snarky").Bool): void;
        toJSON(): {
            publicInput: string[];
            maxProofsVerified: 0 | 1 | 2;
            proof: string;
        };
    };
    publicInputType: typeof PubInput;
    tag: () => {
        name: string;
        publicInputType: typeof PubInput;
    };
    fromJSON<S extends (new (...args: any) => import("snarkyjs/dist/node/lib/proof_system").Proof<unknown>) & {
        prototype: import("snarkyjs/dist/node/lib/proof_system").Proof<any>;
        publicInputType: import("snarkyjs/dist/node/lib/circuit_value").FlexibleProvablePure<any>;
        tag: () => {
            name: string;
        };
        fromJSON: typeof import("snarkyjs/dist/node/lib/proof_system").Proof.fromJSON;
    } & {
        prototype: import("snarkyjs/dist/node/lib/proof_system").Proof<unknown>;
    }>(this: S, { maxProofsVerified, proof: proofString, publicInput: publicInputJson, }: {
        publicInput: string[];
        maxProofsVerified: 0 | 1 | 2;
        proof: string;
    }): import("snarkyjs/dist/node/lib/proof_system").Proof<import("snarkyjs/dist/node/lib/circuit_value").InferProvable<S["publicInputType"]>>;
};
export declare class RandomProof extends RandomProof_ {
}
export declare class RandomSmartContract extends SmartContract {
    previousRandom: State<Field>;
    init(): void;
    verifyFinal(proof: RandomProof, finalRandom: Field, gameHash: Field, previousRandom: Field, userHashedSecret: Field): void;
}
export {};

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Experimental, Field, method, Poseidon, SelfProof, SmartContract, state, State, Struct, } from "snarkyjs";
export class PubInput extends Struct({
    CombinedRandomness: Field,
    Nonce: Field,
    GenerateRandomOutput: Field,
    UserHashedSecret: Field,
}) {
}
export const Random = Experimental.ZkProgram({
    publicInput: PubInput,
    methods: {
        generateFirst: {
            privateInputs: [Field],
            method(pubIn, indivSecret) {
                const hashedSecret = Poseidon.hash([indivSecret]);
                hashedSecret.assertEquals(pubIn.UserHashedSecret);
                const hash = Poseidon.hash([
                    pubIn.CombinedRandomness,
                    pubIn.Nonce,
                    indivSecret,
                ]);
                hash.assertEquals(pubIn.GenerateRandomOutput);
            },
        },
        generateSubsequent: {
            privateInputs: [SelfProof, Field],
            method(pubIn, prevProof, indivSecret) {
                prevProof.verify();
                const hashedSecret = Poseidon.hash([indivSecret]);
                hashedSecret.assertEquals(pubIn.UserHashedSecret);
                let hash = Poseidon.hash([
                    pubIn.CombinedRandomness,
                    prevProof.publicInput.GenerateRandomOutput,
                    indivSecret,
                ]);
                hash.assertEquals(pubIn.GenerateRandomOutput);
            },
        },
    },
});
export let RandomProof_ = Experimental.ZkProgram.Proof(Random);
export class RandomProof extends RandomProof_ {
}
export class RandomSmartContract extends SmartContract {
    constructor() {
        super(...arguments);
        this.previousRandom = State();
    }
    init() {
        super.init();
    }
    verifyFinal(proof, finalRandom, gameHash, previousRandom, userHashedSecret) {
        proof.verify();
        proof.publicInput.CombinedRandomness.assertEquals(gameHash);
        proof.publicInput.GenerateRandomOutput.assertEquals(finalRandom);
        proof.publicInput.Nonce.assertEquals(previousRandom);
        proof.publicInput.UserHashedSecret.assertEquals(userHashedSecret);
    }
}
__decorate([
    state(Field),
    __metadata("design:type", Object)
], RandomSmartContract.prototype, "previousRandom", void 0);
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RandomProof,
        Field,
        Field,
        Field,
        Field]),
    __metadata("design:returntype", void 0)
], RandomSmartContract.prototype, "verifyFinal", null);
//# sourceMappingURL=Random.js.map
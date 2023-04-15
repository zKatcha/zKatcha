import {
  Experimental,
  Field,
  method,
  Poseidon,
  SelfProof,
  SmartContract,
  state,
  State,
  Struct,
} from "snarkyjs";

export class PubInput extends Struct({
  CombinedRandomness: Field,
  Nonce: Field,
  GenerateRandomOutput: Field,
  UserHashedSecret: Field,
}) {}

export const Random = Experimental.ZkProgram({
  publicInput: PubInput,
  methods: {
    generateFirst: {
      privateInputs: [Field],
      method(pubIn: PubInput, indivSecret: Field) {
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
      method(
        pubIn: PubInput,
        prevProof: SelfProof<PubInput>,
        indivSecret: Field
      ) {
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
export class RandomProof extends RandomProof_ {}

export class RandomSmartContract extends SmartContract {
  @state(Field) previousRandom = State<Field>();

  init() {
    super.init();
  }

  @method verifyFinal(
    proof: RandomProof,
    finalRandom: Field,
    gameHash: Field,
    previousRandom: Field,
    userHashedSecret: Field
  ) {
    proof.verify();
    proof.publicInput.CombinedRandomness.assertEquals(gameHash);
    proof.publicInput.GenerateRandomOutput.assertEquals(finalRandom);
    proof.publicInput.Nonce.assertEquals(previousRandom);
    proof.publicInput.UserHashedSecret.assertEquals(userHashedSecret);
  }
}

import {
  Experimental,
  Field,
  isReady,
  method,
  Poseidon,
  SelfProof,
  shutdown,
  SmartContract,
  state,
  State,
  Struct,
  verify,
} from 'snarkyjs';

export class PubInput extends Struct({
  CombinedRandomness: Field,
  Nonce: Field,
  GenerateRandomOutput: Field,
  UserHashedSecret: Field,
}) {}

async function main() {
  await isReady;
  const indivSecret = 1234; // or convert this to field
  const indivSecretField = new Field(indivSecret);

  const combinedRandomness = new Field(1);
  const nonce = new Field(2);
  const hashedSecretField = Poseidon.hash([indivSecretField]);
  const generatedRandomOutput = Poseidon.hash([
    combinedRandomness,
    nonce,
    indivSecretField,
  ]);

  const pubIn = new PubInput({
    CombinedRandomness: combinedRandomness,
    Nonce: nonce,
    GenerateRandomOutput: generatedRandomOutput,
    UserHashedSecret: hashedSecretField,
  });

  console.log(`pubIn: ${JSON.stringify(pubIn)}`);

  const { verificationKey } = await Random.compile();

  const proof = await Random.generateFirst(pubIn, indivSecretField);
  console.log(`proof: ${JSON.stringify(proof)}`);
  const okProof = await Random.verify(proof);
  console.log(`okProof: ${JSON.stringify(okProof)}`);

  const nonce2 = generatedRandomOutput;
  const generatedRandomOutput2 = Poseidon.hash([
    combinedRandomness,
    nonce2,
    indivSecretField,
  ]);

  const pubIn2 = new PubInput({
    CombinedRandomness: combinedRandomness,
    Nonce: nonce2,
    GenerateRandomOutput: generatedRandomOutput2,
    UserHashedSecret: hashedSecretField,
  });

  const proof2 = await Random.generateSubsequent(
    pubIn2,
    proof,
    indivSecretField
  );
  const okProof2 = await Random.verify(proof2);
  console.log(`okProof2: ${JSON.stringify(okProof2)}`);

  const okVerifyOffChain = await verify(proof2.toJSON(), verificationKey);
  console.log(`okVerifyOffChain: ${okVerifyOffChain}`);

  await shutdown();
}

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

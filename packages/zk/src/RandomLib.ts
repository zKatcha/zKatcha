import { Field, Poseidon, Proof, SelfProof, shutdown, verify } from 'snarkyjs';
import { PubInput, Random } from './Random';

export class RandomProver {
  public verificationKey: string;

  setup = async () => {
    if (this.verificationKey) {
      return;
    }
    const { verificationKey } = await Random.compile();
    this.verificationKey = verificationKey;
  };

  ensureSetup = () => {
    if (!this.verificationKey) {
      throw Error('not setup');
    }
  };

  poseidon = (fields: Field[]): Field => {
    const hashed = Poseidon.hash(fields);
    return hashed;
  };

  createRandom = (indvSecret: Field, gameHash: Field, nonce: Field): Field => {
    const random = Poseidon.hash([indvSecret, gameHash, nonce]);
    return random;
  };

  proofFirst = async (
    pubIn: PubInput,
    indivSecretField: Field
  ): Promise<Proof<PubInput>> => {
    const proof = await Random.generateFirst(pubIn, indivSecretField);
    return proof;
  };

  proofSubsequent = async (
    pubIn: PubInput,
    indivSecretField: Field,
    prevProof: SelfProof<PubInput>
  ): Promise<Proof<PubInput>> => {
    const proof = await Random.generateSubsequent(
      pubIn,
      prevProof,
      indivSecretField
    );

    return proof;
  };

  kill = async () => {
    await shutdown();
  };
}

export class RandomVerifier {
  public readonly verifierString;
  constructor(verifierString: string) {
    this.verifierString = verifierString;
  }

  verifyProof = async (proof: Proof<PubInput>): Promise<boolean> => {
    const ok = await verify(proof.toJSON(), this.verifierString);
    return ok;
  };
}

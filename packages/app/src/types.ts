export interface LineInfo {
  name: string;
  value: string;
}
export interface Card {
  suit: "" | "D" | "C" | "H" | "S";
  value: "" | "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K";
}

export interface PlayerHandInfo {
  card1?: Card;
  card2?: Card;
}

export interface DealerHandInfo {
  card1?: Card;
  card2?: Card;
  card3?: Card;
  card4?: Card;
  card5?: Card;
}

export interface PlayerSecretInfo {
  secret?: string;
  hash?: string;
}

export interface SecretInfo {
  player1: PlayerSecretInfo;
  player2: PlayerSecretInfo;
  player3: PlayerSecretInfo;
  player4: PlayerSecretInfo;
  dealer: PlayerSecretInfo;
}

export interface HandInfo {
  player1: PlayerHandInfo;
  player2: PlayerHandInfo;
  player3: PlayerHandInfo;
  player4: PlayerHandInfo;
  dealer: DealerHandInfo;
}

export interface GameInfo {
  turn: string;
  gameHash: string;
  currentRandom: string;
  cardsRemaining: string;
  cardIndex: string;
}

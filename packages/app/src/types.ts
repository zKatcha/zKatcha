export interface LineInfo {
  name: string;
  value: string;
}

export interface PlayerInfo {
  secret: string;
  hash: string;
  card1?: string;
  card2?: string;
}

export interface SecretInfo {
  player1: PlayerInfo;
  player2: PlayerInfo;
  player3: PlayerInfo;
  player4: PlayerInfo;
  dealer: PlayerInfo;
}

export interface GameInfo {
  turn: string;
  gameHash: string;
  currentRandom: string;
  cardsRemaining: string;
  cardIndex: string;
}

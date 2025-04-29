export interface Pot {
  target: number;
  name: string;
  total: number;
  theme: string;
}

export type PotAction =
  | { type: 'ADD_POT'; payload: Pot }
  | { type: 'UPDATE_POT'; payload: { name: string; updatedPot: Pot } }
  | { type: 'DELETE_POT'; payload: { name: string } }
  | { type: 'UPDATE_POT_AMOUNT'; payload: { name: string; newAmount: number } };
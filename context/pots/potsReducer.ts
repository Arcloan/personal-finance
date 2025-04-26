export interface Pot {
  name: string;
  target: number;
  total: number;
  theme: string;
}

export type PotsAction = { type: 'add'; payload: Pot } | { type: 'update'; payload: Pot };

export function potsReducer(state: Pot[], action: PotsAction): Pot[] {
  switch (action.type) {
    case 'add':
      return [action.payload, ...state];
    case 'update':
      return state.map(p => (p.name === action.payload.name ? action.payload : p));
    default:
      throw new Error('Unhandled action type');
  }
}
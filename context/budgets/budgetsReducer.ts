export interface Budget {
  category: string;
  maximum: number;
  theme: string;
}

export type BudgetsAction = { type: 'add'; payload: Budget } | { type: 'update'; payload: Budget };

export function budgetsReducer(state: Budget[], action: BudgetsAction): Budget[] {
  switch (action.type) {
    case 'add':
      return [action.payload, ...state];
    case 'update':
      return state.map(b => (b.category === action.payload.category ? action.payload : b));
    default:
      throw new Error('Unhandled action type');
  }
}
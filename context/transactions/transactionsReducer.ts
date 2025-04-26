export interface Transaction {
  name: string;
  amount: number;
  category: string;
  date: string;
  avatar?: string;
  recurring: boolean;
}

export type TransactionsAction = { type: 'add'; payload: Transaction } | { type: 'remove'; payload: string };

export function transactionsReducer(state: Transaction[], action: TransactionsAction): Transaction[] {
  switch (action.type) {
    case 'add':
      return [action.payload, ...state];
    case 'remove':
      return state.filter(t => t.date !== action.payload);
    default:
      throw new Error('Unhandled action type');
  }
}
export interface Budget {
  category: string;
  maximum: number;
  theme: string;
}

export type BudgetsAction =
  | { type: 'ADD_BUDGET'; payload: Budget }
  | { type: 'UPDATE_BUDGET'; payload: { oldCategory: string; newBudget: Budget } }
  | { type: 'DELETE_BUDGET'; payload: { category: string } };

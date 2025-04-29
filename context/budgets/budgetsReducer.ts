import { Budget, BudgetsAction } from './budgetsTypes';

export function budgetsReducer(state: Budget[], action: BudgetsAction): Budget[] {
  switch (action.type) {
    case 'ADD_BUDGET':
      return [...state, action.payload];

    case 'UPDATE_BUDGET':
      return state.map((budget) =>
        budget.category === action.payload.oldCategory
          ? { ...action.payload.newBudget }
          : budget
      );

    case 'DELETE_BUDGET':
      return state.filter((budget) => budget.category !== action.payload.category);

    default:
      return state;
  }
}